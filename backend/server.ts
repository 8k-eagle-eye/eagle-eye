import app from './app'

const { NODE_ENV, PORT } = process.env

const server = app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[server]  ready on http://localhost:${server.address().port}`)
  }
})
