import { Action as RAction } from 'redux'
import { IDeployment, IDeploymentCreate } from 'shared'
import { IDeploymentsData } from './deployments/deployments.state'

interface ActionWithPayload<T, P> extends RAction<T> {
  payload: P
}

export enum ActionType {
  CreateDeploymentRequest = 'CreateDeploymentRequest',
  CreateDeploymentSuccess = 'CreateDeploymentSuccess',
  CreateDeploymentFailure = 'CreateDeploymentFailure',

  GetDeploymentsDataRequest = 'GetDeploymentsDataRequest',
  GetDeploymentsDataSuccess = 'GetDeploymentsDataSuccess',
  GetDeploymentsDataFailure = 'GetDeploymentsDataFailure',

  DeleteDeploymentRequest = 'DeleteDeploymentRequest',
  DeleteDeploymentSuccess = 'DeleteDeploymentSuccess',
  DeleteDeploymentFailure = 'DeleteDeploymentFailure',
}

export type Action =
  // TODO add erros?
  | ActionWithPayload<ActionType.CreateDeploymentRequest, IDeploymentCreate>
  | ActionWithPayload<ActionType.CreateDeploymentSuccess, IDeployment>
  | ActionWithPayload<ActionType.CreateDeploymentFailure, null>
  | ActionWithPayload<ActionType.GetDeploymentsDataRequest, null>
  | ActionWithPayload<ActionType.GetDeploymentsDataSuccess, IDeploymentsData>
  | ActionWithPayload<ActionType.GetDeploymentsDataFailure, null>
  | ActionWithPayload<ActionType.DeleteDeploymentRequest, string>
  | ActionWithPayload<ActionType.DeleteDeploymentSuccess, string>
  | ActionWithPayload<ActionType.DeleteDeploymentFailure, null>
