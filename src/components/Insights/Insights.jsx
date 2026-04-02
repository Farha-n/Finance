const Insights = ({ insights }) => {
  const { highestCategory, trendMessage, savingsMessage } = insights

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
          <p className="mt-2 text-lg font-bold text-slate-800">{trendMessage}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings rate</p>
          <p className="mt-2 text-lg font-bold text-slate-800">{savingsMessage}</p>
        </article>
      </div>
    </section>
  )
}

export default Insights
