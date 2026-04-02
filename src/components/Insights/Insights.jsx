const Insights = ({ insights }) => {
  const { highestCategory, monthlyChange } = insights

  return (
    <section className="panel-card">
      <h3 className="panel-title">Insights</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Top spending category</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {highestCategory ? `You spent most on ${highestCategory}` : 'No expense data yet'}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly expense trend</p>
          <p className="mt-2 text-lg font-bold text-slate-800">
            Expenses {monthlyChange >= 0 ? 'increased' : 'decreased'} {Math.abs(monthlyChange)}% from last month
          </p>
        </article>
      </div>
    </section>
  )
}

export default Insights
