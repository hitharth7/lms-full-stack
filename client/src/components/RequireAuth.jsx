import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const RequireAuth = () => {
  const { isAuthenticated } = useContext(AppContext)
  const location = useLocation()

  if (!isAuthenticated) {
    const redirectPath = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`/auth?redirect=${redirectPath}`} replace />
  }

  return <Outlet />
}

export default RequireAuth
