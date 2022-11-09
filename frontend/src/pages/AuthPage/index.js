import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import background from '../../assets/images/BLACKCAT.jpg'
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'
import { Navigate } from 'react-router-dom'

const AuthPage = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (values) => {
    dispatch(fetchAuth(values))
  }
  console.log(isAuth)

  if (isAuth) {
    return <Navigate to="/" />
  }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="email"
            className={styles.field}
            label="Email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Enter correct email' })}
            fullWidth
          />
          <TextField
            type="password"
            className={styles.field}
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Enter correct password' })}
            fullWidth
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            sx={{ fontSize: 19, borderRadius: 15, backgroundColor: 'black' }}>
            Sign in
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default AuthPage
