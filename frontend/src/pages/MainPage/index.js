import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import PageLayout from '../../layout'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation()
  return (
    <PageLayout>
      <Box>
        <Paper>
          <Typography variant="h1" sx={{ fontFamily: 'MighaBold' }}>
            {t('Authorization')}
          </Typography>
        </Paper>
      </Box>
    </PageLayout>
  )
}

export default MainPage
