import 'reflect-metadata'
import tachijs, { controller, httpGet } from 'tachijs'

const { NODE_ENV, PORT } = process.env

@controller('/')
class HomeController {
  // Define when this method should be used.
  @httpGet('/')
  index() {
    return {
      message: 'Hello, world!'
    }
  }
}

// Register `HomeController`
const app = tachijs({
  controllers: [HomeController]
})

// `app` is just an express application instance
app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.log(`[server]  ready on http://localhost:${PORT}`)
  }
})
