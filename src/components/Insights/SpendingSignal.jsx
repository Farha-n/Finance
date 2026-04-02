const toneStyles = {
  healthy: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  watch: 'border-amber-200 bg-amber-50 text-amber-900',
  risk: 'border-rose-200 bg-rose-50 text-rose-900',
  neutral: 'border-slate-200 bg-slate-50 text-slate-900',
}

const SpendingSignal = ({ signal }) => {
  return (
    <section className={`panel-card border ${toneStyles[signal.tone]}`}>
      <h3 className="panel-title">Spending Signal</h3>
      <p className="text-base font-bold">{signal.title}</p>
      <p className="mt-2 text-sm leading-6">{signal.message}</p>
    </section>
  )
}

export default SpendingSignal
