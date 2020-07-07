import { IDeploymentTemplate, IDeployment } from 'shared'

export interface IDeploymentsData {
  deploymentTemplates: IDeploymentTemplate[]
  deployments: IDeployment[]
}

export interface IDeploymentsState extends IDeploymentsData {
  isLoading: boolean
  deploymentsIsChanging: boolean
}
