import 'reflect-metadata'
import tachijs, { controller, httpGet } from 'tachijs'

@controller('/')
class HomeController {
  // Define when this method should be used.
  @httpGet('/')
  public index() {
    return {
      message: 'Hello, world!'
    }
  }
}

// Register `HomeController`
const app = tachijs({
  controllers: [HomeController]
})

export default app
