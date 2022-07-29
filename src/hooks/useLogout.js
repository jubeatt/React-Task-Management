import { auth, db } from 'firebase/config'
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch, user } = useAuthContext()
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)

  const logout = async () => {
    setIsPending(true)
    setError(null)
    try {
      // update must be before logout, otherwise firebase wont let us change database
      await db.collection('users').doc(user.uid).update({ online: false })
      await auth.signOut()
      dispatch({ type: 'LOGOUT' })

      if (!isCancelled) {
        setIsPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, isPending, error }
}
