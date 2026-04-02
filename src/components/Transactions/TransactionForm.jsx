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
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    const parsedDate = new Date(formValues.date)
    const amount = Number(formValues.amount)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Please enter a valid date.'
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return 'Please enter a valid amount greater than zero.'
    }

    if (!formValues.category.trim()) {
      return 'Category is required.'
    }

    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = validateForm()

    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setErrorMessage('')
    onSave(formValues)
    // Resetting after save keeps repeated entry fast for admin users.
    setFormValues(initialState)
  }

  const isSubmitDisabled = !formValues.amount || !formValues.category.trim() || !formValues.date

  return (
    <form onSubmit={handleSubmit} className="panel-card grid gap-3 md:grid-cols-5">
      <h3 className="panel-title md:col-span-5">{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
      {errorMessage && (
        <p className="md:col-span-5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {errorMessage}
        </p>
      )}
      <input
        type="date"
        required
        aria-label="Transaction date"
        value={formValues.date}
        onChange={(event) => setFormValues((prev) => ({ ...prev, date: event.target.value }))}
        className="input-control"
      />
      <input
        type="text"
        required
        aria-label="Transaction category"
        placeholder="Category"
        value={formValues.category}
        onChange={(event) => setFormValues((prev) => ({ ...prev, category: event.target.value }))}
        className="input-control"
      />
      <input
        type="number"
        required
        aria-label="Transaction amount"
        min="0"
        step="0.01"
        placeholder="Amount"
        value={formValues.amount}
        onChange={(event) => setFormValues((prev) => ({ ...prev, amount: event.target.value }))}
        className="input-control"
      />
      <select
        aria-label="Transaction type"
        value={formValues.type}
        onChange={(event) => setFormValues((prev) => ({ ...prev, type: event.target.value }))}
        className="input-control"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <div className="flex items-center gap-2">
        <button type="submit" disabled={isSubmitDisabled} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
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
