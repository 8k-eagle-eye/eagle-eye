import app from 'backend/app'

const { NODE_ENV, PORT } = process.env

const server = app.listen(PORT || 8000, () => {
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[server]  ready on http://localhost:${server.address().port}`)
  }
})
