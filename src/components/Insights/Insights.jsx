const Insights = ({ insights }) => {
  const { highestCategory, monthlyChange, savingsRate } = insights
  const isPositiveTrend = typeof monthlyChange === 'number' && monthlyChange >= 0

  return (
    <section className="panel-card">
      <h3 className="panel-title">Insights</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Highest spending category</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {highestCategory ? highestCategory : 'No expense data yet'}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expense trend</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {typeof monthlyChange === 'number'
              ? `Expenses ${isPositiveTrend ? 'increased' : 'decreased'} ${Math.abs(monthlyChange)}% from last month`
              : 'Need at least 2 expense months to show trend'}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings rate</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            Your savings rate is {savingsRate}%
          </p>
        </article>
      </div>
    </section>
  )
}

export default Insights
