export interface IDeployment {
  _id: string
  url: string
  templateName: string
  version: string
  deployedAt: Date
}

export type IDeploymentCreate = Omit<IDeployment, '_id' | 'deployedAt'>
