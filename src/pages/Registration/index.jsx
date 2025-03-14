import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth.js';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: '',
      email: "",
      password: "",
    },
    // mode: 'onChange'
  }); 

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if(!data.payload) {
      return alert('Не удалось авторизироваться')
    }
  if('token' in data.payload){
    window.localStorage.setItem('token', data.payload.token)
  } 
    reset()
  };

  useEffect(() => {

  }, [])

 if(isAuth) {
  return <Navigate to={'/login'} />
 }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField
        error={Boolean(errors.fullname?.message)}
        helperText={errors.fullname?.message}
        {...register("fullname", { required: "Укажите полное имя" })}
        className={styles.field}
        label="Полное имя"
        fullWidth
      />
      <TextField
        type="email"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register("email", { required: "Укажите почту" })}
        className={styles.field}
        label="E-Mail"
        fullWidth
      />
      <TextField
        type="email"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register("email", { required: "Укажите почту" })}
        className={styles.field}
        label="Пароль"
        fullWidth
      />
      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
