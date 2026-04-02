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

export const getInsights = (transactions) => {
  const expenseTotals = {}
  const summary = getSummary(transactions)

  transactions.forEach((item) => {
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

  if (months.length >= 2) {
    const current = monthTotals[months[months.length - 1]]
    const previous = monthTotals[months[months.length - 2]]
    // TODO: improve monthly comparison when dataset grows.
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
    return {
      tone: 'neutral',
      title: 'No income recorded yet',
      message: 'Add at least one income transaction to unlock spending guidance.',
    }
  }

  const expenseRatio = expense / income

  if (expenseRatio >= 0.9) {
    return {
      tone: 'risk',
      title: 'Expenses are approaching income',
      message: 'Your spending is very close to your income. Consider reducing variable expenses.',
    }
  }

  if (expenseRatio >= 0.75) {
    return {
      tone: 'watch',
      title: 'Spending is elevated',
      message: 'Your expense ratio is trending high. Review recent categories to stay in control.',
    }
  }

  return {
    tone: 'healthy',
    title: 'Spending is healthy',
    message: 'Your spending remains controlled relative to income. Keep this momentum.',
  }
}

export const getBudgetProgress = (transactions, monthlyBudget = 5000) => {
  const monthlyExpenses = {}

  transactions.forEach((item) => {
    if (item.type !== 'expense') return
    const month = item.date.slice(0, 7)
    monthlyExpenses[month] = (monthlyExpenses[month] || 0) + item.amount
  })

  const months = Object.keys(monthlyExpenses).sort()
  const activeMonth = months.length ? months[months.length - 1] : null
  const spent = activeMonth ? monthlyExpenses[activeMonth] : 0
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
