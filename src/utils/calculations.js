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

export const getHealthScore = (income, expense) => {
  if (income === 0) return 0

  const savingsRate = (income - expense) / income
  let score = savingsRate * 70

  if (expense < income * 0.7) {
    score += 20
  }

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

  const monthTotals = {}
  transactions.forEach((item) => {
    if (item.type !== 'expense') return
    const month = item.date.slice(0, 7)
    monthTotals[month] = (monthTotals[month] || 0) + item.amount
  })

  const months = Object.keys(monthTotals).sort()
  let monthlyChange = null

  if (monthKey && months.includes(monthKey)) {
    const currentIndex = months.indexOf(monthKey)
    if (currentIndex > 0) {
      const current = monthTotals[monthKey]
      const previousMonth = months[currentIndex - 1]
      const previous = monthTotals[previousMonth]
      // Simple two-month comparison keeps the trend easy to explain during demos.
      monthlyChange = previous === 0 ? 0 : Math.round(((current - previous) / previous) * 100)
    }
  } else if (months.length >= 2) {
    const current = monthTotals[months[months.length - 1]]
    const previous = monthTotals[months[months.length - 2]]
    monthlyChange = previous === 0 ? 0 : Math.round(((current - previous) / previous) * 100)
  }

  const savingsRate =
    summary.income === 0
      ? 0
      : Math.max(0, Math.min(100, Math.round((summary.balance / summary.income) * 100)))

  return {
    highestCategory,
    monthlyChange,
    savingsRate,
  }
}

export const getSpendingSignal = (income, expense) => {
  if (income === 0) {
    return null
  }

  if (expense >= income) {
    return {
      tone: 'risk',
      title: 'Expenses exceed income',
      message: 'Your expenses are higher than your income this month. Reduce variable spending immediately.',
    }
  }

  if (expense >= income * 0.8) {
    return {
      tone: 'watch',
      title: 'Expenses are approaching income',
      message: 'Your expenses are getting close to your income this month. Consider reviewing your top categories.',
    }
  }

  return null
}

export const getBudgetProgress = (transactions, monthlyBudget = 5000, monthKey = null) => {
  const activeMonth = monthKey || getActiveMonthKey(transactions)
  const source = monthKey ? filterTransactionsByMonth(transactions, monthKey) : transactions
  const spent = source
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0)
  const ratio = monthlyBudget === 0 ? 0 : spent / monthlyBudget
  const progress = Math.max(0, Math.min(100, Math.round(ratio * 100)))

  return {
    month: activeMonth,
    budget: monthlyBudget,
    spent,
    progress,
    remaining: Math.max(0, monthlyBudget - spent),
    isOverBudget: spent > monthlyBudget,
  }
}
