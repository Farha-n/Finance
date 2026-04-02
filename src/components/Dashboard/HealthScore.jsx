const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 50) return 'Good'
  return 'Needs Attention'
}

const getScoreColor = (score) => {
  if (score >= 80) return '#16A34A'
  if (score >= 50) return '#F59E0B'
  return '#DC2626'
}

const HealthScore = ({ score }) => {
  const safeScore = Math.max(0, Math.min(100, score))
  const scoreColor = getScoreColor(safeScore)

  return (
    <section className="panel-card flex flex-col items-center justify-center gap-3">
      <h3 className="panel-title self-start">Financial Health Score</h3>
      <div
        className="relative grid size-40 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${scoreColor} ${safeScore * 3.6}deg, #E2E8F0 0deg)`,
        }}
      >
        <div className="grid size-28 place-items-center rounded-full bg-white text-center shadow-inner">
          <p className="text-3xl font-bold text-slate-800">{safeScore}%</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Score</p>
        </div>
      </div>
      <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
        {getScoreLabel(safeScore)}
      </p>
    </section>
  )
}

export default HealthScore
