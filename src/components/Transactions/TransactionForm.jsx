import { useState } from 'react'

const initialState = {
  date: '',
  amount: '',
  category: '',
  type: 'expense',
}

const buildFormState = (transaction) =>
  transaction
    ? {
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
      }
    : initialState

const TransactionForm = ({ onSave, transaction, onCancel }) => {
  const [formValues, setFormValues] = useState(() => buildFormState(transaction))

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(formValues)
    // TODO: add category suggestion dropdown fed by past user behavior.
    setFormValues(initialState)
  }

  return (
    <form onSubmit={handleSubmit} className="panel-card grid gap-3 md:grid-cols-5">
      <h3 className="panel-title md:col-span-5">{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
      <input
        type="date"
        required
        value={formValues.date}
        onChange={(event) => setFormValues((prev) => ({ ...prev, date: event.target.value }))}
        className="input-control"
      />
      <input
        type="text"
        required
        placeholder="Category"
        value={formValues.category}
        onChange={(event) => setFormValues((prev) => ({ ...prev, category: event.target.value }))}
        className="input-control"
      />
      <input
        type="number"
        required
        min="0"
        step="0.01"
        placeholder="Amount"
        value={formValues.amount}
        onChange={(event) => setFormValues((prev) => ({ ...prev, amount: event.target.value }))}
        className="input-control"
      />
      <select
        value={formValues.type}
        onChange={(event) => setFormValues((prev) => ({ ...prev, type: event.target.value }))}
        className="input-control"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <div className="flex items-center gap-2">
        <button type="submit" className="btn-primary w-full">
          {transaction ? 'Update' : 'Save'}
        </button>
        {transaction && (
          <button type="button" onClick={onCancel} className="btn-secondary w-full">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TransactionForm
