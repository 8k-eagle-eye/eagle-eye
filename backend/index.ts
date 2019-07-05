import tachijs, { controller, httpGet } from 'tachijs'

@controller('/')
class HomeController() {
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
app.listen(8000)
