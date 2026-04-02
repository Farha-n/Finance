const BudgetTracker = ({ budgetData }) => {
  const {
    month,
    budget,
    spent,
    remaining,
    progress,
    isOverBudget,
    savingsTarget,
    actualSavings,
    savingsMessage,
    explanation,
  } = budgetData

  return (
    <section className="panel-card">
      <h3 className="panel-title">Monthly Budget Tracker</h3>
      <p className="text-sm text-slate-600">
        {month ? `Tracking ${month}` : 'No expense month available yet'}
      </p>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>Spent: ${spent.toLocaleString()}</span>
          <span>Budget (80%): ${budget.toLocaleString()}</span>
        </div>
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>Savings Target (20%): ${savingsTarget.toLocaleString()}</span>
          <span>Actual Savings: ${actualSavings.toLocaleString()}</span>
        </div>
        <div className="h-3 rounded-full bg-slate-200">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${isOverBudget ? 'bg-rose-500' : 'bg-brand'}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <p className={`mt-3 text-sm font-semibold ${isOverBudget ? 'text-rose-700' : 'text-slate-700'}`}>
        {isOverBudget
          ? `Over budget by $${Math.abs(budget - spent).toLocaleString()}`
          : `You are within your budget for this month. Remaining: $${remaining.toLocaleString()}`}
      </p>
      <p className={`mt-2 text-sm font-semibold ${actualSavings >= savingsTarget ? 'text-emerald-700' : 'text-amber-700'}`}>
        {actualSavings >= savingsTarget ? `✅ ${savingsMessage}` : `⚠️ ${savingsMessage}`}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{explanation}</p>
    </section>
  )
}

export default BudgetTracker
