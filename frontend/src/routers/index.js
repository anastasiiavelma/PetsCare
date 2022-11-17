import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import MainPage from '../pages/MainPage'
import { Home } from '../pages/Home'
import { Post } from '../components/Post'
import { AddPost } from '../pages/AddPost'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Post />} />
      <Route path="/add-article" element={<AddPost />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/stat" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
const Root = () => {
  return <PublicRoutes />
}

export default Root
