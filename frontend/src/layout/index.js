import React from 'react'
import { Box, Container, MenuItem, Select, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const PageLayout = ({ children }) => {
  const { i18n } = useTranslation()
  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value)
  }
  return (
    <>
      <Stack
        sx={{
          height: 'px',
          width: 'px',
          marginBottom: '1px',
          marginTop: '5px'
        }}>
        <Select value={i18n.language} onChange={handleChangeLanguage}>
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ua">UA</MenuItem>
        </Select>
      </Stack>
      <Box>
        <Container>{children}</Container>
      </Box>
    </>
  )
}
PageLayout.propTypes = {
  children: PropTypes.node
}
export default PageLayout
