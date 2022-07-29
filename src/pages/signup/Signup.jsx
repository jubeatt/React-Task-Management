import React, { useState } from 'react'
import { useSignup } from 'hooks/useSignup'
import { TextField, Container, LoadingButton, Alert, Stack, Button, Input } from 'mui'

// style
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailText, setThumbnailText] = useState('')
  const [thumbnailError, setThumbnailError] = useState(null)
  const { error, isPending, signup } = useSignup()

  const handleFileChange = (e) => {
    setThumbnailError(null)
    const selected = e.target.files[0]
    setThumbnailText(selected?.name ? selected.name : '')
    if (!selected) {
      return setThumbnailError('Must select one file.')
    }
    if (!selected.type.includes('image')) {
      return setThumbnailError('This file must be an image.')
    }
    if (selected.size > 1000000) {
      return setThumbnailError('This file is bigger than 100KB.')
    }
    setThumbnail(selected)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!thumbnail) return setThumbnailError('Must select one file.')
    signup(email, password, displayName, thumbnail)
  }

  return (
    <div className='signup'>
      <Container maxWidth='xs'>
        <form className='form' autoComplete='off' onSubmit={handleSubmit}>
          <h2 className='title'>Signup</h2>
          {error && (
            <Alert sx={{ margin: '15px 0' }} severity='error'>
              {error}
            </Alert>
          )}
          <Stack spacing={4}>
            <TextField
              required
              variant='standard'
              type='email'
              label='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              variant='standard'
              label='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              label='display name'
              variant='standard'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <div className='upload'>
              <div className='upload-image'>
                <div>
                  <span>profile thumbnail:</span>
                  <div className='file-text'>
                    {thumbnailText ? thumbnailText : 'Not choose yet.'}
                  </div>
                </div>
                <label htmlFor='upload-image'>
                  <Input
                    type='file'
                    sx={{ display: 'none' }}
                    id='upload-image'
                    onChange={handleFileChange}
                  />
                  <Button variant='contained' component='span'>
                    Upload
                  </Button>
                </label>
              </div>
              {thumbnailError && (
                <Alert sx={{ margin: '15px 0' }} severity='error'>
                  {thumbnailError}
                </Alert>
              )}
            </div>
            <LoadingButton
              sx={{ alignSelf: 'flex-start' }}
              type='submit'
              loading={isPending}
              variant='outlined'
            >
              Signup
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </div>
  )
}
