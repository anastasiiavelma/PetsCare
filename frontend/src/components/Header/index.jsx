import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { Select, MenuItem } from "@mui/material"
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  const onClickLogout = () => {
    if (window.confirm(`${t('Are you sure you want to logout ?')}`)) {
      dispatch(logout());
      window.localStorage.removeItem('token')
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>PetsCare</div>
          </Link>
          <div className={styles.inner}>
            <Select
              value={i18n.language}
              onChange={handleChangeLanguage}
              sx={{ minWidth: 90, height: 37,
                borderRadius: '15px'}}
            >
              <MenuItem value='en'>EN</MenuItem>
              <MenuItem value='ua'>UA</MenuItem>
            </Select>

            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/add-articles">
                    <Button>{t(' Add article ')}</Button>
                  </Link>
                  <Link to="/stat">
                    <Button>{t('View statistic')}</Button>
                  </Link>
                  <Button onClick={onClickLogout} variant="contained"
                          style={{
                            backgroundColor: '#F9C3B7',
                            color: 'black',
                            paddingRight: '40px',
                            paddingLeft: '40px'
                          }}>
                    {t('Exit')}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined">{t('Log In')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
