import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import background from '../../assets/images/BLACKCAT.jpg'
import styles from './style.module.css'

const AuthPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        background: `url(${background}) center / cover no-repeat`,
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}>
      <Paper
        classes={{ root: styles.root }}
        sx={{
          height: 370,
          alignContent: 'center',
          marginLeft: 20,
          marginTop: 20,
          marginRight: 40
        }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Authorization
        </Typography>
        <TextField className={styles.field} label="Email" fullWidth />
        <TextField className={styles.field} label="Password" fullWidth />
        <Button
          size="large"
          variant="contained"
          fullWidth
          sx={{ fontSize: 19, borderRadius: 15, backgroundColor: 'black' }}>
          Sign in
        </Button>
      </Paper>
    </div>
  )
}

export default AuthPage
