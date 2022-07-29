import { auth, db } from 'firebase/config'
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogIn = () => {
  const { dispatch } = useAuthContext()
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)

  const login = async (eamil, password) => {
    setIsPending(true)
    setError(null)
    try {
      const response = await auth.signInWithEmailAndPassword(eamil, password)
      await db.collection('users').doc(response.user.uid).update({ online: true })
      dispatch({ type: 'LOGIN', payload: response.user })

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

  return { login, isPending, error }
}
