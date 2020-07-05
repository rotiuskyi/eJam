import { Schema, Document, model } from 'mongoose'
import { IDeploymentTemplate } from 'shared'

const DeploymentTemplateSchema = new Schema({
  name: String,
  versions: Array,
})

export const DeploymentTemplate = model<IDeploymentTemplate & Document>(
  'deployments.templates',
  DeploymentTemplateSchema
)
