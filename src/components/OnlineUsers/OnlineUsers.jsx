import React from 'react'
import { useCollection } from 'hooks/useCollection'

// style
import './OnlineUsers.css'

// mui
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'

export default function OnlineUsers() {
  const { documents, error } = useCollection('users')

  return (
    <div className='online-users'>
      <h3>All Users</h3>
      {error && (
        <Alert sx={{ margin: '15px 0' }} severity='error'>
          {error}
        </Alert>
      )}
      <ul>
        {documents &&
          documents.map((user) => (
            <li key={user.id}>
              {user.online && <span>dot</span>}
              <p>{user.displayName}</p>
              <Avatar alt="user's thumbnail" src={user.photoURL} sx={{ width: 40, height: 40 }} />
            </li>
          ))}
      </ul>
    </div>
  )
}
