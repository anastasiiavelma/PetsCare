import { Box, Container } from '@mui/material'
import StatCard from '../StatCard'
import React, { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'

function Statistics() {
  const [allStatistics, setAllStatistics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setAllStatistics([])

    setAllStatistics((prev) => [
      {
        type: 'AreaChart',
        title: 'Users',
        data: '',
        xAsis: 'dateOfGettingPro',
        yAsis: 'count'
      },
      {
        type: 'AreaChart',
        title: 'Registered Users',
        data: '',
        xAsis: 'dateOfRegister',
        yAsis: 'count'
      },
      {
        type: 'AreaChart',
        title: 'Registered Users',
        data: '',
        xAsis: 'dateOfRegister',
        yAsis: 'count'
      }
    ])

    setLoading(false)
  }, [])

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          flexWrap: 'wrap'
        }}>
        {loading ? (
          <PacmanLoader
            loading={loading}
            size={60}
            css={{ margin: '50px auto 0', display: 'block' }}
            color="#C1C77A"
          />
        ) : (
          allStatistics.map((item) => (
            <StatCard
              maxHeight={item.maxHeight ? item.maxHeight : undefined}
              type={item.type}
              key={item.title}
              title={item.title}
              data={item.data}
              xAsis={item.xAsis}
              yAsis={item.yAsis}
            />
          ))
        )}
      </Box>
    </Container>
  )
}

export default Statistics
