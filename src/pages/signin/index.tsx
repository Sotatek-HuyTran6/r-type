import React, { useState } from 'react';
import './style.scss';
import { TextField, FormControl, Button, Typography } from '@mui/material';
import { login } from 'redux/auth/actions';
import { Account } from 'types/auth';
import { useAppdispatch } from 'utils/common';
import { useSelector } from 'react-redux';
import { RootState } from 'types/redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useAppdispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<Account>({
    username: '',
    password: '',
  });
  const { error, isLoading } = auth;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const account = loginForm;
    dispatch(login({ ...account, grant_type: 'password' }, navigate));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  return (
    <div className='login-container'>
      <div className='background-image'>
        <div className='overlay-image'></div>
        <img src='/images/background.jpg'></img>
      </div>
      <div className='login'>
        <div className='login__left-side'>
          <div className='intro'>
            <div className='app-icon'>
              <img src='/images/web-logo.png'></img>
            </div>
            <div>
              <span
                style={{
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '2.4rem',
                  letterSpacing: '2px',
                }}
              >
                Zee
              </span>
              <span
                style={{
                  color: 'white',
                  fontSize: '2.4rem',
                }}
              >
                Home
              </span>
            </div>
          </div>
        </div>
        <div className='login__right-side'>
          <div className='form-container'>
            <Typography variant='h4' className='title'>
              Sign in
            </Typography>
            <Typography variant='subtitle1' className='subtitle'>
              New user? <div className='subtitle-redirect'>Create an account</div>
            </Typography>
            <form className='form' onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  label='username'
                  variant='standard'
                  style={{ width: '100%' }}
                  name='username'
                  value={loginForm.username}
                  onChange={handleChange}
                ></TextField>
              </FormControl>
              <FormControl style={{ width: '100%' }}>
                <TextField
                  label='password'
                  variant='standard'
                  type='password'
                  style={{ width: '100%' }}
                  name='password'
                  value={loginForm.password}
                  onChange={handleChange}
                ></TextField>
              </FormControl>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    style={{ textTransform: 'none', borderRadius: '20px' }}
                  >
                    Continue
                  </Button>
                </FormControl>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
