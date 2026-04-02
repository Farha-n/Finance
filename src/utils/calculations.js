export const getSummary = (transactions) => {
  let income = 0
  let expense = 0

  transactions.forEach((item) => {
    if (item.type === 'income') {
      income += item.amount
    } else {
      expense += item.amount
    }
  })

  return {
    income,
    expense,
    balance: income - expense,
  }
}

export const getActiveMonthKey = (transactions) => {
  if (!transactions.length) return null
  const latest = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  return latest.date.slice(0, 7)
}

export const getAvailableMonthKeys = (transactions) =>
  [...new Set(transactions.map((item) => item.date.slice(0, 7)))].sort((a, b) =>
    a < b ? 1 : -1,
  )

export const filterTransactionsByMonth = (transactions, monthKey) => {
  if (!monthKey) return []
  return transactions.filter((item) => item.date.slice(0, 7) === monthKey)
}

const getPreviousMonthKey = (monthKey) => {
  if (!monthKey) return null
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 2, 1)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export const getHealthScore = (income, expense, budget, savingsTarget) => {
  if (income === 0) return 0

  const actualSavings = income - expense
  const safeTarget = savingsTarget > 0 ? savingsTarget : 1
  let score = 0

  // Savings contribution
  score += (actualSavings / safeTarget) * 50

  // Budget discipline
  if (expense <= budget) score += 30

  // Baseline
  score += 20

  return Math.max(0, Math.min(100, Math.round(score)))
}

export const getBalanceTrendData = (transactions) => {
  const ordered = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))

  let runningBalance = 0
  return ordered.map((item) => {
    const delta = item.type === 'income' ? item.amount : -item.amount
    runningBalance += delta

    return {
      date: item.date,
      balance: runningBalance,
    }
  })
}

export const getExpenseByCategory = (transactions) => {
  const totals = {}

  transactions.forEach((item) => {
    if (item.type === 'expense') {
      totals[item.category] = (totals[item.category] || 0) + item.amount
    }
  })

  return Object.entries(totals).map(([name, value]) => ({ name, value }))
}

export const getInsights = (transactions, monthKey = null) => {
  const scopedTransactions = monthKey
    ? filterTransactionsByMonth(transactions, monthKey)
    : transactions
  const expenseTotals = {}
  const summary = getSummary(scopedTransactions)

  scopedTransactions.forEach((item) => {
    if (item.type === 'expense') {
      expenseTotals[item.category] = (expenseTotals[item.category] || 0) + item.amount
    }
  })

  const highestCategory = Object.keys(expenseTotals).length
    ? Object.keys(expenseTotals).reduce((a, b) =>
        expenseTotals[a] > expenseTotals[b] ? a : b,
      )
    : null

  let monthlyChange = null
  let trendMessage = 'Not enough data to show trend'

  if (scopedTransactions.length >= 2) {
    const currentExpense = scopedTransactions
      .filter((item) => item.type === 'expense')
      .reduce((total, item) => total + item.amount, 0)

    const previousMonthKey = getPreviousMonthKey(monthKey)
    const prevTransactions = filterTransactionsByMonth(transactions, previousMonthKey)
    const prevMonthExpense = prevTransactions
      .filter((item) => item.type === 'expense')
      .reduce((total, item) => total + item.amount, 0)

    if (!prevMonthExpense) {
      trendMessage = 'Not enough data to show trend'
    } else if (currentExpense === 0 && prevMonthExpense > 0) {
      trendMessage = 'Expenses dropped significantly compared to last month'
      monthlyChange = -100
    } else {
      const change = ((currentExpense - prevMonthExpense) / prevMonthExpense) * 100
      monthlyChange = Math.round(change)
      if (change > 0) {
        trendMessage = `Expenses increased by ~${Math.round(change)}% compared to last month`
      } else {
        trendMessage = `Expenses decreased by ~${Math.abs(Math.round(change))}% compared to last month`
      }
    }
  }

  const savingsRate =
    summary.income === 0
      ? 0
      : Math.max(0, Math.min(100, Math.round((summary.balance / summary.income) * 100)))

  const savingsMessage =
    summary.expense === 0
      ? 'You had no expenses this month, resulting in a 100% savings rate.'
      : `You're saving ${savingsRate}% of your income, which is ${savingsRate >= 50 ? 'a strong financial position.' : 'a solid baseline to improve from.'}`

  return {
    highestCategory,
    monthlyChange,
    trendMessage,
    savingsRate,
    savingsMessage,
  }
}

export const getSpendingSignal = (income, expense, budget) => {
  if (income === 0) {
    return null
  }

  if (expense > income) {
    return {
      tone: 'risk',
      title: 'Expenses exceed income',
      message: 'Your expenses are higher than your income this month. Reduce variable spending immediately.',
    }
  }

  if (expense > budget) {
    return {
      tone: 'risk',
      title: 'Expenses are above planned budget',
      message: 'You are exceeding your planned budget for this month.',
    }
  }

  if (expense > income * 0.8) {
    return {
      tone: 'watch',
      title: 'Expenses are approaching income',
      message: 'Your expenses are getting close to your income this month. Consider reviewing your top categories.',
    }
  }

  return null
}

export const getBudgetProgress = (income, expense, monthKey = null) => {
  const budget = Math.round(income * 0.8)
  const savingsTarget = Math.round(income * 0.2)
  const actualSavings = income - expense
  const spent = expense
  const ratio = budget === 0 ? 0 : spent / budget
  const progress = Math.max(0, Math.min(100, Math.round(ratio * 100)))

  const savingsMessage =
    actualSavings >= savingsTarget
      ? 'You met your savings goal this month.'
      : 'You are below your savings target.'

  return {
    month: monthKey,
    budget,
    spent,
    progress,
    remaining: Math.max(0, budget - spent),
    isOverBudget: spent > budget,
    savingsTarget,
    actualSavings,
    savingsMessage,
    explanation:
      '80% of income is allocated for spending, and 20% is reserved for savings or investments.',
  }
}
