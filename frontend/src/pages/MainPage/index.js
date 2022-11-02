import React from 'react'

import background from '../../assets/images/backCat1.jpg'
import { Header } from '../../components/Header'
import Statistics from '../../components/Statistics'

const MainPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          background: `url(${background}) center / cover no-repeat`,
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}>
        <Statistics />
      </div>
    </>
  )
}

export default MainPage
