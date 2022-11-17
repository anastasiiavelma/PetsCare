import React from 'react'

import Statistics from '../../components/Stat'

const StatPage = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          background: `#E3C1C1FF`,
          borderRadius: "20px",
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}>
         <Statistics />
      </div>
    </>
  )
}

export default StatPage
