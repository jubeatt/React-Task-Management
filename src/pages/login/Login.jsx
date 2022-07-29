import React, { useState } from 'react'
import { useLogIn } from 'hooks/useLogin'
import { TextField, Container, LoadingButton, Alert, Stack } from 'mui'

// style
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogIn()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className='login'>
      <Container maxWidth='xs'>
        <form className='form' autoComplete='off' onSubmit={handleSubmit}>
          <h2 className='title'>Login</h2>
          {error && (
            <Alert sx={{ margin: '15px 0' }} severity='error'>
              {error}
            </Alert>
          )}
          <Stack spacing={4}>
            <TextField
              required
              type='email'
              label='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant='standard'
            />
            <TextField
              required
              label='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='standard'
            />
            <LoadingButton
              sx={{ alignSelf: 'flex-start' }}
              type='submit'
              loading={isPending}
              variant='outlined'
            >
              Login
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </div>
  )
}
