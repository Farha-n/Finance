import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#1A6BFF', '#16A34A', '#DC2626', '#F59E0B', '#0EA5E9', '#8B5CF6', '#14B8A6']

const ExpensePieChart = ({ data }) => {
  return (
    <section className="panel-card">
      <h3 className="panel-title">Expense Categories</h3>
      {data.length === 0 ? (
        <p className="empty-message">Only income recorded. No expense chart yet.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.map((entry, index) => (
                  <Cell key={`${entry.name}-${entry.value}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default ExpensePieChart
