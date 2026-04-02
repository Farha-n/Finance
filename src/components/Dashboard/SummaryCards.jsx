const cardStyles = {
  balance: 'from-brand to-blue-700 text-white',
  income: 'from-income to-emerald-700 text-white',
  expense: 'from-expense to-rose-700 text-white',
}

const formatCurrency = (value) => {
  if (value < 0) return `-$${Math.abs(value).toLocaleString()}`
  return `$${value.toLocaleString()}`
}

const SummaryCards = ({ summary, month }) => {
  const cards = [
    { label: 'Balance (This Month)', value: summary.balance, key: 'balance' },
    { label: 'Income (This Month)', value: summary.income, key: 'income' },
    { label: 'Expenses (This Month)', value: summary.expense, key: 'expense' },
  ]

  return (
    <section>
      <div className="mb-3 text-sm font-semibold text-slate-500">
        {month ? `Active month: ${month}` : 'No active month selected'}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.key}
          className={`rounded-2xl bg-gradient-to-br p-5 shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl ${cardStyles[card.key]}`}
        >
          <p className="text-sm uppercase tracking-wider text-white/80">{card.label}</p>
          <p className="mt-2 text-3xl font-bold">{formatCurrency(card.value)}</p>
        </article>
      ))}
      </div>
    </section>
  )
}

export default SummaryCards
