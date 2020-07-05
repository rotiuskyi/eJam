import { Router, Express, Request, Response, NextFunction } from 'express'
import { Deployment } from 'models/Deployment'
import { DeploymentTemplate } from 'models/DeploymentTemplate'
import { IDeployment } from 'shared'

const deployments = Router()

deployments.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await Deployment.find())
  }
)

deployments.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const { url, templateName, version }: IDeployment = req.body

    const deployment = await new Deployment({
      url,
      templateName,
      version,
    }).save()

    res.json(deployment.toObject())
  }
)

deployments.get(
  '/templates',
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await DeploymentTemplate.find())
  }
)

export default (app: Express) => {
  return app.use('/deployments', deployments)
}
