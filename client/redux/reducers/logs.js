import axios from 'axios'

const INITIAL_LOAD = 'INITIAL_LOAD'
const GET_FULL = 'GET_FULL'

const initialState = {
  value: '',
  string: ''
}

const date = new Date()

const setStr = (value) => {
  switch (value.type) {
    case '##ADD_ITEM':
      return `add ${value.item.title} to the backet`
    case '##REMOVE_ITEM':
      return `remove ${value.item.title} from the backet`
    case '##GET_SORT':
      return `sort by ${value.sort}`
    case '##GET_CURRENCY': {
      if (value.oldCurrency !== value.newCurrency) {
        return `change currency from ${value.oldCurrency} to ${value.newCurrency}`
      }
      return undefined
    }
    default:
      return undefined
  }
}

export default async (state = initialState, action) => {
  const string = action.type.indexOf('##') === 0 ? setStr(action) : this
  if (typeof string !== 'undefined') {
    await fetch('/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date.toString(), action: string })
    })
  }
  return state
}

// export default async (state = initialState, action) => {
//   await fetch('/api/v1/logs', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ date: date.toString(), value: `Changed from ${action.value} to B` })
//   })
//   return state
// }

export function getLogFile() {
  return (dispatch) => {
    axios('/api/v1/logs').then(() => {
      dispatch({ type: INITIAL_LOAD })
    })
  }
}

export function getFullState() {
  return (dispatch, getState) => {
    const { value } = getState().currency
    dispatch({ type: GET_FULL, value })
  }
}
