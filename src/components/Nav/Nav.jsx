import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'
import { useLogout } from 'hooks/useLogout'

// mui
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'

// style
import './Nav.css'
import logo from 'assets/temple.svg'

export default function Nav() {
  const { user } = useAuthContext()
  const { logout, isPending, error } = useLogout()

  return (
    <div className='nav'>
      <div className='wrap'>
        <div className='title'>
          <img className='logo' src={logo} alt='the dojo' />
          <h1>The Dojo</h1>
        </div>
        {error && (
          <Alert severity='error' sx={{ marginRight: '10px' }}>
            {error}
          </Alert>
        )}
        <div className='options'>
          {!user ? (
            <>
              <Button variant='text'>
                <Link to='/login'>Login</Link>
              </Button>
              <Button variant='text'>
                <Link to='/signup'>Signup</Link>
              </Button>
            </>
          ) : (
            <LoadingButton type='submit' loading={isPending} variant='outlined' onClick={logout}>
              Logout
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  )
}
