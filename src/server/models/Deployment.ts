import { Schema, Document, model } from 'mongoose'
import { IDeployment } from 'shared'

const DeploymentSchema = new Schema({
  url: String,
  templateName: String,
  version: String,
  deployedAt: { type: Date, default: Date.now },
})

export const Deployment = model<IDeployment & Document>(
  'deployments',
  DeploymentSchema
)
