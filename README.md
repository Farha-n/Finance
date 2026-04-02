# Finance Dashboard

A product-focused personal finance dashboard built with React.
It helps users track transactions, understand spending behavior, and monitor overall financial health using lightweight analytics.

## Overview

This project is designed to demonstrate more than UI rendering.
It combines dashboard visualization with interpretation-oriented metrics, including a financial health score and actionable insights.

## Core Features

- Summary cards for income, expenses, and net balance
- Balance trend line chart
- Expense category pie chart
- Financial Health Score (`((income - expense) / income) * 100`)
- Insights panel with:
	- Highest spending category
	- Month-over-month expense change
	- Savings rate
- Transactions module with:
	- Add, edit, delete (admin only)
	- Search by category
	- Filter by type (`all`, `income`, `expense`)
	- Sorting by amount/date
- Role-based experience:
	- `viewer`: read-only analytics
	- `admin`: full transaction management
- Empty-state handling for first-use and filtered-result scenarios
- Local storage persistence for transactions and role state

## Tech Stack

- React + Vite
- Tailwind CSS
- Recharts
- Context API
- UUID

## Project Structure

```text
src/
	components/
		Common/
		Dashboard/
		Insights/
		Transactions/
	context/
	data/
	hooks/
	pages/
	utils/
```

## Architecture Decisions

- Context API manages app-wide state (`transactions`, `role`, and filters) without over-engineering.
- Domain calculations are kept in `src/utils/calculations.js` to separate business logic from rendering.
- `useTransactions` centralizes list behavior (search/filter/sort) so table components remain presentation-focused.
- Recharts provides responsive charting with low setup cost and clear composability.

## Key Design Decisions

- Used Context API for lightweight state management.
- Chose Recharts for composability with React.
- Added a Financial Health Score to provide actionable insight instead of raw data only.
- Focused on simplicity and readability over feature overload.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Evaluation Notes

This project intentionally includes:

- Product-style interpretation (not just data display)
- Role-based behavior and permissions at UI level
- Edge-case handling and clear empty states
- Modular folder design for maintainability and extension
