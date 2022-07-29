import React, { useRef, useState } from 'react'
import { Alert, Box, LinearProgress, Tab, Tabs, tabsClasses, CircularProgress } from 'mui'
import { useCollection } from 'hooks/useCollection'
import ProjectList from './ProjectList'

// style
import './Dashboard.css'
import { useAuthContext } from 'hooks/useAuthContext'

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Mine', value: 'mine' },
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' }
]

export default function DashBoard() {
  const { user } = useAuthContext()
  const [filter, setFilter] = useState('all')
  const queryMap = useRef({
    all: null,
    development: ['category', '==', 'development'],
    design: ['category', '==', 'design'],
    sales: ['category', '==', 'sales'],
    marketing: ['category', '==', 'marketing'],
    mine: [
      'assignedUsers',
      'array-contains',
      {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    ]
  })
  const { isPending, error, documents } = useCollection('projects', queryMap.current[filter])

  return (
    <div className='dashboard'>
      <h2 className='page-title'>DashBoard</h2>
      <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={filter}
          variant='scrollable'
          onChange={(_, value) => setFilter(value)}
          textColor='secondary'
          scrollButtons='auto'
          indicatorColor='secondary'
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 }
            }
          }}
        >
          {filterOptions.map((f) => (
            <Tab sx={{ textTransform: 'none' }} key={f.value} value={f.value} label={f.label} />
          ))}
        </Tabs>
      </Box>
      {isPending ? (
        <LinearProgress />
      ) : (
        <>
          {error && <Alert severity='error'>{error}</Alert>}
          {documents && <ProjectList projects={documents} />}
        </>
      )}
    </div>
  )
}
