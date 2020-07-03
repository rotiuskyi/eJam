import { Router, Express, Request, Response, NextFunction } from 'express'

const deployments = Router()

deployments.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    deployments: ['a', 'b', 'c'],
  })
})

export default (app: Express) => {
  return app.use('/deployments', deployments)
}
