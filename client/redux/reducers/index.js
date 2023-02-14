import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import items from './items'
import currency from './currency'
import logs from './logs'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    logs,
    items,
    currency
  })

export default createRootReducer
