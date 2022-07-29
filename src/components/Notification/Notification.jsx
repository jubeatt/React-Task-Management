import React from 'react'
import { Alert, Snackbar } from 'mui'

export default function Notification({ open, type, message, onClose, ...props }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      autoHideDuration={2000}
      {...props}
    >
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}
