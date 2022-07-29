import { useEffect, useState } from 'react'
import { auth, storage, db } from 'firebase/config'
import { useAuthContext } from './useAuthContext'

export function useSignup() {
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setIsPending(true)
    setError(null)
    try {
      // create user
      const response = await auth.createUserWithEmailAndPassword(email, password)
      if (!response.user) throw new Error('Signup failed.')

      // upload thumbnail
      const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
      const img = await storage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // update profile
      await response.user.updateProfile({ displayName, photoURL: imgUrl })

      // create user document
      await db.collection('users').doc(response.user.uid).set({
        photoURL: imgUrl,
        displayName,
        online: true
      })

      // update global state
      dispatch({
        type: 'LOGIN',
        payload: response.user
      })
      // update state
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

  return { error, isPending, signup }
}
