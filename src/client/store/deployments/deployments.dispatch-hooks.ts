import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { Action, ActionType } from '../action'
import { IDeploymentCreate } from 'shared'
import * as api from 'api/deployments'

export function useCreateDeployment() {
  const dispatch = useDispatch<Dispatch<Action>>()

  return async (deployment: IDeploymentCreate) => {
    dispatch({
      type: ActionType.CreateDeploymentRequest,
      payload: deployment,
    })

    try {
      const deploymentCreated = await api.createDeployment(deployment)

      dispatch({
        type: ActionType.CreateDeploymentSuccess,
        payload: deploymentCreated,
      })
    } catch (err) {
      dispatch({
        type: ActionType.CreateDeploymentFailure,
        payload: null,
      })
    }
  }
}

export function useDeleteDeployment() {
  const dispatch = useDispatch<Dispatch<Action>>()

  return async (deploymentId: string) => {
    dispatch({
      type: ActionType.DeleteDeploymentRequest,
      payload: deploymentId,
    })

    try {
      await api.deleteDeployment(deploymentId)

      dispatch({
        type: ActionType.DeleteDeploymentSuccess,
        payload: deploymentId,
      })
    } catch (err) {
      dispatch({
        type: ActionType.DeleteDeploymentFailure,
        payload: null,
      })
    }
  }
}

export function useGetDeploymentsData() {
  const dispatch = useDispatch<Dispatch<Action>>()

  return async () => {
    dispatch({
      type: ActionType.GetDeploymentsDataRequest,
      payload: null,
    })

    try {
      const [deploymentTemplates, deployments] = await Promise.all([
        api.getDeploymentTemplates(),
        api.getDeployments(),
      ])

      dispatch({
        type: ActionType.GetDeploymentsDataSuccess,
        payload: {
          deploymentTemplates,
          deployments,
        },
      })
    } catch (err) {
      dispatch({
        type: ActionType.GetDeploymentsDataFailure,
        payload: null,
      })
    }
  }
}
