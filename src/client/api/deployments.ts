import { request } from './http-client'
import { IDeployment, IDeploymentTemplate } from 'shared'

export async function getDeployments(): Promise<IDeployment[]> {
  return request('/deployments')
}

export async function getDeploymentTemplates(): Promise<IDeploymentTemplate[]> {
  return request('/deployments/templates')
}

export async function createDeployment(
  deployment: Omit<IDeployment, '_id' | 'deployedAt'>
): Promise<IDeployment> {
  return request('/deployments', {
    method: 'POST',
    body: JSON.stringify(deployment),
  })
}
