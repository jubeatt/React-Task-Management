import { db } from 'firebase/config'
import { useEffect, useState } from 'react'

export const useDocument = (collectionName, documentName) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)

  useEffect(() => {
    setIsPending(true)
    setError(null)
    const unsubscribe = db
      .collection(collectionName)
      .doc(documentName)
      .onSnapshot(
        (snapshot) => {
          if (!snapshot.exists) {
            setError('Can not find that document')
            setIsPending(false)
            return
          }
          setDocument(snapshot.data())
          setIsPending(false)
        },
        (error) => {
          // for developer
          console.log(error.message)
          setIsPending(false)
          setError(error.message)
        }
      )

    return () => unsubscribe()
  }, [collectionName, documentName])

  return { isPending, error, document }
}
