import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import MainPage from '../pages/MainPage'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
const Root = () => {
  const user = false
  return user ? <PrivateRoutes /> : <PublicRoutes />
}

export default Root
