import React from 'react'
import styles from './style.module.scss'

// eslint-disable-next-line react/prop-types
export const UserInfo = ({ avatarUrl, email, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={email} />
      <div className={styles.userDetails}>
        <span className={styles.email}>{email}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
