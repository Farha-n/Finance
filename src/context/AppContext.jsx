import { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { transactions as mockTransactions } from '../data/mockData'
import AppContext from './AppContextObject'

const STORAGE_KEYS = {
  transactions: 'finance-dashboard-transactions',
  role: 'finance-dashboard-role',
}

const normalizeCategory = (category = '') =>
  category
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem(STORAGE_KEYS.transactions)
    return storedTransactions ? JSON.parse(storedTransactions) : mockTransactions
  })
  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEYS.role) || 'viewer')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, role)
  }, [role])

  const addTransaction = (payload) => {
    const newTransaction = {
      id: uuidv4(),
      ...payload,
      amount: Number(payload.amount),
      category: normalizeCategory(payload.category),
    }

    setTransactions((previous) => [newTransaction, ...previous])
  }

  const updateTransaction = (id, payload) => {
    setTransactions((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              ...payload,
              amount: Number(payload.amount),
              category: normalizeCategory(payload.category),
            }
          : item,
      ),
    )
  }

  const deleteTransaction = (id) => {
    setTransactions((previous) => previous.filter((item) => item.id !== id))
  }

  const contextValue = useMemo(
    () => ({
      transactions,
      setTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      role,
      setRole,
      filter,
      setFilter,
    }),
    [transactions, role, filter],
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
