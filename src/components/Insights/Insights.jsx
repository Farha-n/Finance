const Insights = ({ insights }) => {
  const { highestCategory, monthlyChange, savingsRate } = insights
  const isPositiveTrend = typeof monthlyChange === 'number' && monthlyChange >= 0
  // NOTE: Keeping insights simple for demo clarity.

  return (
    <section className="panel-card">
      <h3 className="panel-title">Insights</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Highest spending category</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {highestCategory ? highestCategory : 'No expense data yet'}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expense trend</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {typeof monthlyChange === 'number'
              ? `Your expenses ${isPositiveTrend ? 'increased' : 'decreased'} by ${Math.abs(monthlyChange)}% compared to last month. ${isPositiveTrend ? 'Consider reviewing your spending.' : 'Great control on spending this month.'}`
              : 'Need at least 2 expense months to show trend'}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings rate</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            You're saving {savingsRate}% of your income, which is {savingsRate >= 50 ? 'a strong financial position.' : 'a solid baseline to improve from.'}
          </p>
        </article>
      </div>
    </section>
  )
}

export default Insights
