import request from 'supertest'
import app from '../../backend/index'

describe('/', () => {
  it('GET request', async () => {
    // When
    const response = await request(app).get('/')

    // Then
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      message: 'Hello, world!'
    })
  })
})
