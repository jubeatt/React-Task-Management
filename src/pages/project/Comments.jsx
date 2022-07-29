import React, { useEffect, useState } from 'react'
import Notification from 'components/Notification'
import { Alert, Avatar, Box, Card, CardContent, LoadingButton, Stack, TextField } from 'mui'
import uniqid from 'uniqid'
import { styles } from './style'
import { timestamp } from 'firebase/config'
import { useAuthContext } from 'hooks/useAuthContext'
import { useFirebase } from 'hooks/useFirebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function Comments({ comments, docId }) {
  const [newComment, setNewComment] = useState('')
  const { response, updateDocument } = useFirebase('projects')
  const { user } = useAuthContext()
  const [notification, setNotification] = useState({
    type: 'success',
    open: false,
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: uniqid(),
      createdAt: timestamp.fromDate(new Date()),
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment
    }
    updateDocument(docId, data, 'comments')
  }

  useEffect(() => {
    if (response.success) {
      setNewComment('')
      setNotification({
        type: 'success',
        open: true,
        message: 'Add comment success'
      })
    }
    if (response.error) {
      setNewComment('')
      setNotification({
        type: 'error',
        open: true,
        message: response.error
      })
    }
  }, [response.success, response.error])

  return (
    <>
      <h2 className='page-title'>Project Comments</h2>
      <Stack spacing={2}>
        {comments.length === 0 && <Alert severity='info'>No comment yet!</Alert>}
        {comments.map((comment) => (
          <Card key={comment.id} sx={styles.shadow}>
            <CardContent>
              <Box sx={styles.box}>
                <Avatar src={comment.photoURL} />
                <Box sx={styles.author}>{comment.displayName}</Box>
              </Box>
              <Box sx={{ ...styles.textPrimary, mb: 2 }}>
                {formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
              </Box>
              <Box sx={styles.textPrimary}>{comment.content}</Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Box sx={{ my: 2 }}>
        <Box sx={{ fontSize: '1em', color: '#444', mb: 1 }}>Add new comment:</Box>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            variant='filled'
            label='Message'
            multiline
            rows={2}
            sx={{ mb: 1 }}
            disabled={response.isPending}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <LoadingButton
            loading={response.isPending}
            type='submit'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
          >
            Add Comment
          </LoadingButton>
        </form>
      </Box>
      <Notification
        open={notification.open}
        type={notification.type}
        message={notification.message}
        onClose={(e, reason) => {
          if (reason === 'clickaway') return
          setNotification((prev) => ({ ...prev, open: false }))
        }}
      />
    </>
  )
}
