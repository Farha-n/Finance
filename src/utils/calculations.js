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

  const ratio = (income - expense) / income
  return Math.max(0, Math.min(100, Math.round(ratio * 100)))
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
  let monthlyChange = 0

  if (months.length >= 2) {
    const current = monthTotals[months[months.length - 1]]
    const previous = monthTotals[months[months.length - 2]]
    monthlyChange = previous === 0 ? 0 : Math.round(((current - previous) / previous) * 100)
  }

  return {
    highestCategory,
    monthlyChange,
  }
}
