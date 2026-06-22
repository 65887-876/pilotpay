import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getAdminToken } from '../../../lib/adminApi'

export function AdminGuard() {
  const location = useLocation()
  const token = getAdminToken()

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
