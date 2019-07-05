import 'reflect-metadata'
import tachijs, { controller, httpGet } from 'tachijs'

const port = 8000

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
app.listen(port, () => {
  console.log(`[server]  ready on http://localhost:${port}`)
})
