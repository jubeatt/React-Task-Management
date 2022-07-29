import React, { useEffect } from 'react'
import { styles } from './style'
import { useFirebase } from 'hooks/useFirebase'
import { useAuthContext } from 'hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  LoadingButton,
  useSnackbar,
  Alert
} from 'mui'

export default function Detail({ docId, project, error }) {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuthContext()
  const { response, deleteDocument } = useFirebase('projects')

  useEffect(() => {
    if (response.success) {
      enqueueSnackbar('Mission complete!', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
      history.push('/')
    }
    if (response.error) {
      enqueueSnackbar(response.error, {
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
      history.push('/')
    }
  }, [response.success, response.error, history, enqueueSnackbar])

  return (
    <>
      {error && !response.isPending && <Alert severity='error'>{error}</Alert>}
      <Card sx={styles.shadow}>
        <CardContent>
          <Typography gutterBottom sx={styles.title} variant='h2'>
            {project.name}
          </Typography>
          <Box sx={{ ...styles.box, mb: 2 }}>
            <Box sx={{ ...styles.textSecondary, mr: 'auto' }}>
              Project by {project.dueDate.toDate().toDateString()}
            </Box>
            <Box sx={styles.textSecondary}>By {project.createdBy.displayName}</Box>
            <Avatar sx={{ width: 32, height: 32 }} src={project.createdBy.photoURL} />
          </Box>
          <Box sx={{ ...styles.textPrimary, my: 3, fontSize: '16px' }}>{project.detail}</Box>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Box>
            <Box sx={{ color: '#444', fontSize: '1em', mb: 1 }}>Projects is assigned to:</Box>
            <AvatarGroup max={4}>
              {project.assignedUsers.map((user) => (
                <Avatar key={user.id} alt='user.displayName' src={user.photoURL} />
              ))}
            </AvatarGroup>
          </Box>
        </CardContent>
      </Card>
      {project.createdBy.id === user.uid && (
        <LoadingButton
          type='submit'
          variant='outlined'
          sx={{ mt: 2, backgroundColor: 'white' }}
          loading={response.isPending}
          onClick={() => deleteDocument(docId)}
        >
          Mark as Complete
        </LoadingButton>
      )}
    </>
  )
}
