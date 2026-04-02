import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const BalanceLineChart = ({ data }) => {
  return (
    <section className="panel-card h-full">
      <h3 className="panel-title">Balance Trend (This Month)</h3>
      {data.length === 0 ? (
        <p className="empty-message">No data available</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 8, left: 8, bottom: 16 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#DDE4F3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#1A6BFF" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default BalanceLineChart
