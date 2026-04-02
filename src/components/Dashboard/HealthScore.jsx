const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 50) return 'Good'
  return 'Needs Attention'
}

const HealthScore = ({ score }) => {
  return (
    <section className="panel-card flex flex-col items-center justify-center gap-3">
      <h3 className="panel-title self-start">Financial Health Score</h3>
      <div
        className="relative grid size-40 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#1A6BFF ${score * 3.6}deg, #E2E8F0 0deg)`,
        }}
      >
        <div className="grid size-28 place-items-center rounded-full bg-white text-center shadow-inner">
          <p className="text-3xl font-bold text-slate-800">{score}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Score</p>
        </div>
      </div>
      <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{getScoreLabel(score)}</p>
    </section>
  )
}

export default HealthScore
