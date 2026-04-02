const badgeStyles = {
  income: 'bg-green-100 text-green-700',
  expense: 'bg-rose-100 text-rose-700',
}

const TransactionTable = ({
  rows,
  role,
  searchTerm,
  onSearch,
  filter,
  onFilter,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="panel-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="panel-title">Transactions</h3>
        <div className="flex flex-wrap gap-2">
          <input
            value={searchTerm}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search category"
            className="input-control min-w-44"
          />
          <select value={filter} onChange={(event) => onFilter(event.target.value)} className="input-control">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={sortOrder} onChange={(event) => onSort(event.target.value)} className="input-control">
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
            <option value="date-desc">Date: Newest</option>
            <option value="date-asc">Date: Oldest</option>
          </select>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="empty-message">No transactions matched your current filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-2 font-semibold">Date</th>
                <th className="px-3 py-2 font-semibold">Category</th>
                <th className="px-3 py-2 font-semibold">Amount</th>
                <th className="px-3 py-2 font-semibold">Type</th>
                {role === 'admin' && <th className="px-3 py-2 font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{item.date}</td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3 font-semibold">${Number(item.amount).toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyles[item.type]}`}>
                      {item.type}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(item)} className="btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => onDelete(item.id)} className="btn-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default TransactionTable
