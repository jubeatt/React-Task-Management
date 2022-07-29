import { useState, useEffect, useRef } from 'react'
import { db } from 'firebase/config'

export const useCollection = (collection, query, _orderBy) => {
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  const [documents, setDocuments] = useState([])
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    setIsPending(true)
    setError(null)

    let ref = db.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot({
      next: (snapshot) => {
        const result = []
        snapshot.docs.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id
          })
        })
        setDocuments(result)
        setIsPending(false)
      },
      error: (error) => {
        // for developer
        console.log(error.message)
        setError('Can not fetch that collection')
        setIsPending(false)
      }
    })

    return () => unsubscribe()
  }, [collection, query, orderBy])

  return { isPending, error, documents }
}
