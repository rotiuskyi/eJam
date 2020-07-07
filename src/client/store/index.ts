import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { Action } from './action'
import { deploymentsState } from './deployments/deployments.reducer'

const rootReducer = combineReducers({ deploymentsState })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore<RootState, Action, {}, {}>(
  rootReducer,
  composeEnhancers(applyMiddleware())
)

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
