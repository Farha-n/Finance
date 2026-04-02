import { useContext, useMemo, useState } from 'react'
import RoleSwitcher from '../components/Common/RoleSwitcher'
import BalanceLineChart from '../components/Dashboard/BalanceLineChart'
import ExpensePieChart from '../components/Dashboard/ExpensePieChart'
import HealthScore from '../components/Dashboard/HealthScore'
import SummaryCards from '../components/Dashboard/SummaryCards'
import Insights from '../components/Insights/Insights'
import TransactionForm from '../components/Transactions/TransactionForm'
import TransactionTable from '../components/Transactions/TransactionTable'
import AppContext from '../context/AppContextObject'
import { useTransactions } from '../hooks/useTransactions'
import {
  getBalanceTrendData,
  getExpenseByCategory,
  getHealthScore,
  getInsights,
  getSummary,
} from '../utils/calculations'

const Dashboard = () => {
  const { transactions } = useContext(AppContext)
  const {
    role,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    visibleTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions()

  const [editingTransaction, setEditingTransaction] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const summary = useMemo(() => getSummary(transactions), [transactions])
  const healthScore = useMemo(() => getHealthScore(summary.income, summary.expense), [summary])
  const lineData = useMemo(() => getBalanceTrendData(transactions), [transactions])
  const pieData = useMemo(() => getExpenseByCategory(transactions), [transactions])
  const insights = useMemo(() => getInsights(transactions), [transactions])

  const handleSave = (payload) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, payload)
      setEditingTransaction(null)
      return
    }

    addTransaction(payload)
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Finance Pulse</p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Finance Dashboard</h1>
        </div>
        <RoleSwitcher />
      </header>

      <SummaryCards summary={summary} />

      <section className="my-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BalanceLineChart data={lineData} />
        </div>
        <HealthScore score={healthScore} />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <ExpensePieChart data={pieData} />
        <Insights insights={insights} />
      </section>

      {transactions.length === 0 && <p className="empty-message mb-4">No transactions available.</p>}

      {role === 'viewer' && (
        <p className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-blue-800">
          Viewer mode: you can browse and analyze data. Switch to Admin to add, edit, or delete transactions.
        </p>
      )}

      {role === 'admin' && (
        <section className="mb-4">
          <div className="mb-3 flex justify-end">
            <button
              onClick={() => {
                setShowForm((current) => !current)
                if (showForm) setEditingTransaction(null)
              }}
              className="btn-primary"
            >
              {showForm ? 'Hide Form' : 'Add Transaction'}
            </button>
          </div>

          {showForm && (
            <TransactionForm
              key={editingTransaction?.id || 'new-transaction'}
              onSave={handleSave}
              transaction={editingTransaction}
              onCancel={() => setEditingTransaction(null)}
            />
          )}
        </section>
      )}

      <TransactionTable
        rows={visibleTransactions}
        hasTransactions={transactions.length > 0}
        role={role}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filter={filter}
        onFilter={setFilter}
        sortOrder={sortOrder}
        onSort={setSortOrder}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />
    </main>
  )
}

export default Dashboard
