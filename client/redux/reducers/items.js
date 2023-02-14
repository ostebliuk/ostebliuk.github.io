import axios from 'axios'

const GET_ITEMS = 'GET_ITEMS'
const GET_SORT = '##GET_SORT'
const ADD_ITEM = '##ADD_ITEM'
const REMOVE_ITEM = '##REMOVE_ITEM'
const itemsURL =
  'https://raw.githubusercontent.com/ovasylenko/skillcrcuial-ecommerce-test-data/master/data.json'

const initialState = {
  list: [],
  basket: [],
  sortBy: '',
  amounts: {},
  totalSum: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        list: action.list
      }
    }
    case GET_SORT: {
      if (action.sort === 'name') {
        return {
          ...state,
          list: [...state.list].sort((a, b) => a.title.localeCompare(b.title)),
          basket: [...state.basket].sort((a, b) => a.title.localeCompare(b.title)),
          sortBy: 'name'
        }
      }
      if (action.sort === 'price') {
        return {
          ...state,
          list: [...state.list].sort((a, b) => b.price - a.price),
          basket: [...state.basket].sort((a, b) => b.price - a.price),
          sortBy: 'price'
        }
      }
      return {
        ...state
      }
    }
    case ADD_ITEM: {
      let count = 1
      if (action.id in state.amounts) {
        count = state.amounts[action.id] + 1
      }

      if (state.sortBy === 'name') {
        return {
          ...state,
          basket: [...state.basket, action.item].sort((a, b) => a.title.localeCompare(b.title)),
          amounts: { ...state.amounts, [action.id]: count },
          totalSum: state.totalSum + action.price
        }
      }
      if (state.sortBy === 'price') {
        return {
          ...state,
          basket: [...state.basket, action.item].sort((a, b) => b.price - a.price),
          amounts: { ...state.amounts, [action.id]: count },
          totalSum: state.totalSum + action.price
        }
      }
      return {
        ...state,
        basket: [...state.basket, action.item],
        amounts: { ...state.amounts, [action.id]: count },
        totalSum: state.totalSum + action.price
      }
    }
    case REMOVE_ITEM: {
      let count = state.amounts[action.id]
      count -= 1
      count = count < 0 ? 0 : count
      let newAmounts = { ...state.amounts }
      if (count === 0) {
        delete newAmounts[action.item.id]
      } else {
        newAmounts = { ...state.amounts, [action.id]: count }
      }
      return {
        ...state,
        index: state.basket.indexOf(action.item),
        basket: [
          ...state.basket.slice(0, state.basket.indexOf(action.item)),
          ...state.basket.slice(state.basket.indexOf(action.item) + 1)
        ],
        amounts: { ...newAmounts },
        totalSum: state.totalSum - action.price
      }
    }

    default:
      return state
  }
}

export function getItems() {
  return (dispatch) => {
    axios(itemsURL).then(({ data }) => {
      dispatch({ type: GET_ITEMS, list: data })
    })
  }
}

export function getSort(sort) {
  return { type: GET_SORT, sort }
}

export function addItem(item, id, price) {
  return { type: ADD_ITEM, item, id, price }
}

export function removeItem(item, id, price) {
  return { type: REMOVE_ITEM, item, id, price }
}
