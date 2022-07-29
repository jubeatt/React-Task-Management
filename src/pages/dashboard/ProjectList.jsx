import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  AvatarGroup,
  Avatar,
  Divider,
  Box,
  Alert
} from 'mui'

export default function ProjectList({ projects }) {
  return (
    <>
      {projects.length === 0 && <Alert severity='info'>No project yet!</Alert>}
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid key={project.id} item xs={12} lg={6} xl={4}>
            <Card
              sx={{
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1
                  }}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt={project.createdBy.displayName}
                    src={project.createdBy.photoURL}
                  />
                  <Box>
                    <Typography
                      sx={{
                        lineHeight: 1.2,
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '10em'
                      }}
                      variant='h6'
                    >
                      {project.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color='text.disabled'>
                      Due by {project.dueDate.toDate().toDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <AvatarGroup max={4}>
                  {project.assignedUsers.map((user) => (
                    <Avatar key={user.id} alt={user.displayName} src={user.photoURL} />
                  ))}
                </AvatarGroup>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  sx={{
                    p: 0,
                    '& > a': {
                      padding: '6px 8px'
                    }
                  }}
                >
                  <Link to={`/project/${project.id}`}>Check Detail</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
