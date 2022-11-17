import React from 'react'
import Button from '@mui/material/Button'

import styles from './style.module.css'
import Container from '@mui/material/Container'
import PageLayout from '../../layout'
import { t } from 'i18next'

export const Header = () => {
  const onClickLogout = () => {}

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/Home.jsx">
            <div>PetsCare</div>
          </a>
          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <a className={styles.logo1} href="/stat">
                <div>Stat</div> <div style={{ color: 'white' }}>wwwwwww</div>
              </a>
            </div>
            <div>
              <a className={styles.logo1} href="/">
                <div>Post</div>
              </a>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.button}>
              <>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  style={{
                    backgroundColor: '#F9C3B7',
                    color: 'black',
                    paddingRight: '40px',
                    paddingLeft: '40px'
                  }}>
                  {t('Exit')}
                </Button>
                <PageLayout />
              </>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
