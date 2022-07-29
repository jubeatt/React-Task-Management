import { useDocument } from 'hooks/useDocument'
import React from 'react'
import { useParams } from 'react-router-dom'
import Detail from './Detail'
import Comments from './Comments'
import { Box, Grid, LinearProgress } from 'mui'

export default function Project() {
  const { id } = useParams()
  const { isPending, error, document } = useDocument('projects', id)

  return isPending ? (
    <LinearProgress />
  ) : (
    <>
      {document && (
        <Box sx={{ mb: '120px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Detail docId={id} project={document} error={error} />
            </Grid>
            <Grid item xs={12} lg={4}>
              {<Comments docId={id} comments={document.comments} />}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}
