const cardStyles = {
  balance: 'from-brand to-blue-700 text-white',
  income: 'from-income to-emerald-700 text-white',
  expense: 'from-expense to-rose-700 text-white',
}

const SummaryCards = ({ summary }) => {
  const cards = [
    { label: 'Total Balance', value: summary.balance, key: 'balance' },
    { label: 'Income', value: summary.income, key: 'income' },
    { label: 'Expenses', value: summary.expense, key: 'expense' },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.key}
          className={`rounded-2xl bg-gradient-to-br p-5 shadow-lg transition hover:-translate-y-0.5 ${cardStyles[card.key]}`}
        >
          <p className="text-sm uppercase tracking-wider text-white/80">{card.label}</p>
          <p className="mt-2 text-3xl font-bold">${card.value.toLocaleString()}</p>
        </article>
      ))}
    </div>
  )
}

export default SummaryCards
