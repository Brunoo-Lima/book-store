import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

class App {
  readonly app
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.app.use(cors())
    this.app.use(helmet())
  }

  private routes (): void {
  }
}

export default new App().app
