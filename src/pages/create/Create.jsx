import React, { useEffect, useState } from 'react'
import { db, timestamp } from 'firebase/config'
import { useAuthContext } from 'hooks/useAuthContext'
import { useFirebase } from 'hooks/useFirebase'
import Notification from 'components/Notification'
import {
  Alert,
  Avatar,
  Chip,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Box,
  DesktopDatePicker,
  AdapterDateFns,
  LocalizationProvider,
  LoadingButton
} from 'mui'

// style
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

export default function Create() {
  const [error, setError] = useState(null)
  const [init, setInit] = useState(false)
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [category, setCategory] = useState('')
  const [dropdownList, setDropdownList] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])
  const { user } = useAuthContext()
  const { response, addDocument } = useFirebase('projects')
  const [notification, setNotification] = useState({
    type: 'success',
    open: false,
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const project = {
      name,
      detail,
      category,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid
      },
      assignedUsers: assignedUsers.map((user) => ({
        id: user.id,
        displayName: user.displayName,
        photoURL: user.photoURL
      }))
    }
    addDocument(project)
  }

  useEffect(() => {
    if (response.documents) {
      setNotification({
        type: 'success',
        open: true,
        message: 'Create project success!'
      })
      setName('')
      setDetail('')
      setDueDate(null)
      setCategory('')
      setAssignedUsers([])
    }
    if (response.error) {
      setNotification({
        type: 'error',
        open: true,
        message: response.error
      })
    }
  }, [response.documents, response.error])

  useEffect(() => {
    db.collection('users')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) throw new Error(`Can not get user list`)
        const result = []
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setDropdownList(result)
        setInit(true)
      })
      .catch((error) => {
        setInit(true)
        setError(error.message)
      })
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {!init ? (
        <LinearProgress />
      ) : (
        <Box className='create'>
          {error && <Alert severity='error'>{error}</Alert>}
          {!error && (
            <>
              <h2 className='page-title'>Create a new project</h2>
              <form name='create-form' onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <TextField
                    required
                    variant='standard'
                    type='text'
                    label='Project Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    required
                    variant='standard'
                    label='Project Detail'
                    multiline
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    rows={2}
                  />
                  <DesktopDatePicker
                    minDate={new Date()}
                    label='Due date'
                    inputFormat='yyyy/MM/dd'
                    value={dueDate}
                    onChange={setDueDate}
                    renderInput={(params) => <TextField required {...params} />}
                  />
                  <FormControl required>
                    <InputLabel>Project Category</InputLabel>
                    <Select
                      label='Project Category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      MenuProps={{
                        sx: {
                          maxHeight: '200px'
                        }
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl required>
                    <InputLabel>Assign to</InputLabel>
                    <Select
                      label='Assign to'
                      multiple
                      value={assignedUsers}
                      onChange={(e) => setAssignedUsers(e.target.value)}
                      renderValue={(selectedUsers) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {selectedUsers.map((user) => (
                            <Chip
                              avatar={<Avatar alt='avatar' src={user.photoURL} />}
                              variant='outlined'
                              key={user.id}
                              label={user.displayName}
                            />
                          ))}
                        </Box>
                      )}
                      MenuProps={{
                        sx: {
                          maxHeight: '200px'
                        }
                      }}
                    >
                      {dropdownList.map((user) => (
                        <MenuItem key={user.id} value={user}>
                          {user.displayName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LoadingButton
                    sx={{ alignSelf: 'flex-start' }}
                    type='submit'
                    loading={response.isPending}
                    variant='outlined'
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </form>
              {/* Notification */}
              <Notification
                open={notification.open}
                type={notification.type}
                message={notification.message}
                onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
              />
            </>
          )}
        </Box>
      )}
    </LocalizationProvider>
  )
}
