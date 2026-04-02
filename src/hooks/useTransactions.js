import { useContext, useMemo, useState } from 'react'
import AppContext from '../context/AppContextObject'

export const useTransactions = () => {
  const { transactions, filter, setFilter, role, addTransaction, updateTransaction, deleteTransaction } =
    useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('amount-desc')

  const visibleTransactions = useMemo(() => {
    const filtered = transactions.filter((item) => {
      const byCategory = item.category.toLowerCase().includes(searchTerm.toLowerCase())
      const byType = filter === 'all' ? true : item.type === filter
      return byCategory && byType
    })

    return filtered.sort((a, b) => {
      if (sortOrder === 'amount-desc') return b.amount - a.amount
      if (sortOrder === 'amount-asc') return a.amount - b.amount
      if (sortOrder === 'date-desc') return new Date(b.date) - new Date(a.date)
      return new Date(a.date) - new Date(b.date)
    })
  }, [transactions, searchTerm, filter, sortOrder])

  return {
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
  }
}
