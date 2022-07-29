import React from 'react'
import { Alert, SnackbarProvider as Provider } from 'mui'

const MySuccessSnackbar = React.forwardRef((props, ref) => {
  console.log('props', props)
  return (
    <Alert ref={ref} severity='success'>
      {props.message}
    </Alert>
  )
})

export function SnackbarProvider({ children }) {
  return (
    <Provider
      components={{
        success: MySuccessSnackbar
      }}
    >
      {children}
    </Provider>
  )
}
