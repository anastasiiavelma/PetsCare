import React from 'react'
import Button from '@mui/material/Button'

import styles from './style.module.css'
import Container from '@mui/material/Container'

export const Header = () => {
  const onClickLogout = () => {}

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>PetsCare</div>
          </a>
          <div className={styles.button}>
            <Button
              onClick={onClickLogout}
              variant="contained"
              style={{
                backgroundColor: 'white',
                color: 'black',
                paddingRight: '40px',
                paddingLeft: '40px'
              }}>
              Выйти
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
