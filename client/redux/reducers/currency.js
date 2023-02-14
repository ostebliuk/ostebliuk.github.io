import axios from 'axios'

const GET_CURRENCY = '##GET_CURRENCY'
const ratesURL = 'https://api.exchangeratesapi.io/latest'

const initialState = {
  multiplier: 1,
  symbol: '€',
  value: 'EUR'
}
const currencySymbol = (newCurrency) => {
  switch (newCurrency) {
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'CAD':
      return 'C$'
    default:
      return '€'
  }
}
export default (state = initialState, action) => {
  if (action.newCurrency !== state.value) {
    switch (action.type) {
      case GET_CURRENCY: {
        return {
          ...state,
          multiplier: action.multiplier || 1,
          symbol: currencySymbol(action.newCurrency),
          value: action.newCurrency
        }
      }
      default:
        return state
    }
  }
  return state
}

export function getCurrency(newCurrency, oldCurrency) {
  return (dispatch) => {
    axios(ratesURL).then(({ data }) => {
      dispatch({
        type: GET_CURRENCY,
        multiplier: data.rates[newCurrency],
        newCurrency,
        oldCurrency
      })
    })
  }
}

export function getInitialCurrency() {
  return () => {}
}
