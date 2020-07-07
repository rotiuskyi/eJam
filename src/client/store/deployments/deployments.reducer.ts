import { Action, ActionType } from '../action'
import { IDeploymentsState } from './deployments.state'

const initialState: IDeploymentsState = {
  deploymentTemplates: [],
  deployments: [],
  isLoading: false,
  deploymentsIsChanging: false,
}

export function deploymentsState(
  state: IDeploymentsState = initialState,
  action: Action
): IDeploymentsState {
  switch (action.type) {
    case ActionType.CreateDeploymentRequest:
      return { ...state, deploymentsIsChanging: true }
    case ActionType.CreateDeploymentSuccess:
      return {
        ...state,
        deployments: [...state.deployments, action.payload],
        deploymentsIsChanging: false,
      }
    case ActionType.CreateDeploymentFailure:
      return { ...state, deploymentsIsChanging: false }
    case ActionType.GetDeploymentsDataRequest:
      return { ...state, isLoading: true }
    case ActionType.GetDeploymentsDataSuccess:
      return { ...state, ...action.payload, isLoading: false }
    case ActionType.GetDeploymentsDataFailure:
      return { ...state, isLoading: false }
    case ActionType.DeleteDeploymentRequest:
      return { ...state, deploymentsIsChanging: true }
    case ActionType.DeleteDeploymentSuccess:
      const ndx = state.deployments.findIndex((d) => d._id === action.payload)
      const left = state.deployments.slice(0, ndx)
      const right = state.deployments.slice(ndx + 1)
      return {
        ...state,
        deployments: [...left, ...right],
        deploymentsIsChanging: false,
      }
    case ActionType.DeleteDeploymentFailure:
      return { ...state, deploymentsIsChanging: false }
    default:
      return state
  }
}
