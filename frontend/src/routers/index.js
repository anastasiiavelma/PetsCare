import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/authPage'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<>MainPrivate</>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
const Root = () => {
  const user = false
  return user ? <PrivateRoutes /> : <PublicRoutes />
}

export default Root
