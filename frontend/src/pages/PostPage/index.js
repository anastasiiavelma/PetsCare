import React from 'react'
// import background from '../../assets/images/backCat1.jpg'
import { Header } from '../../components/Header'
// import { Home } from '../Home'
import { FullPost } from '../FullPost'
import { Home } from '../Home'
import { AddPost } from '../AddPost'
import { Container } from '@mui/material'

const MainPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        <FullPost />
        <AddPost />
      </Container>
    </>
  )
}

export default MainPage
