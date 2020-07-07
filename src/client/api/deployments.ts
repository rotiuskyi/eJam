import { request } from './http-client'
import { IDeployment, IDeploymentTemplate, IDeploymentCreate } from 'shared'

export async function getDeployments(): Promise<IDeployment[]> {
  return request('/deployments')
}

export async function getDeploymentTemplates(): Promise<IDeploymentTemplate[]> {
  return request('/deployments/templates')
}

export async function createDeployment(
  deployment: IDeploymentCreate
): Promise<IDeployment> {
  return request('/deployments', {
    method: 'POST',
    body: JSON.stringify(deployment),
  })
}

export async function deleteDeployment(deploymentId: string) {
  return await request(`/deployments/${deploymentId}`, {
    method: 'DELETE',
  })
}
