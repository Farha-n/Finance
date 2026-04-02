import { useContext } from 'react'
import AppContext from '../../context/AppContextObject'

const RoleSwitcher = () => {
  const { role, setRole } = useContext(AppContext)

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
      Role
      <select
        value={role}
        onChange={(event) => setRole(event.target.value)}
        className="rounded-full border border-slate-200 px-3 py-1 text-sm outline-none transition focus:border-brand"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  )
}

export default RoleSwitcher
