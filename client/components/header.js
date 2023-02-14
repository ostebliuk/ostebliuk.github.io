import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSort } from '../redux/reducers/items'
import { getCurrency } from '../redux/reducers/currency'
// import { getFullState } from '../redux/reducers/logs'
import Head from './head'

const Header = () => {
  const basketQuantity = useSelector((s) => s.items.basket.length)
  const totalSum = useSelector((s) => s.items.totalSum)
  const currencySymbol = useSelector((s) => s.currency.symbol)
  const oldCurrency = useSelector((s) => s.currency.value)
  const ratesMultiplier = useSelector((s) => s.currency.multiplier)
  const dispatch = useDispatch()

  return (
    <div>
      <Head title="Hello" />
      <div className="flex justify-around mt-4 font-semibold">
        <div>
          <Link id="#brand-name" to="/">
            <img
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
              alt="home"
              src="https://img.icons8.com/windows/28/000000/home.png"
            />
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-r-0 border-gray-400 rounded-l"
            onClick={() => {
              dispatch(getCurrency('USD', oldCurrency))
              // dispatch(getFullState())
            }}
          >
            USD
          </button>
          <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-r-0 border-l-0 border-gray-400"
            onClick={() => dispatch(getCurrency('EUR', oldCurrency))}
          >
            EUR
          </button>
          <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-l-0 border-gray-400 rounded-r"
            onClick={() => dispatch(getCurrency('CAD', oldCurrency))}
          >
            CAD
          </button>
        </div>
        <div>
          <button
            id="#sort-name"
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-r-0 border-gray-400 rounded-l"
            onClick={() => dispatch(getSort('name'))}
          >
            Sort by name
          </button>
          <button
            id="#sort-price"
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-l-0 border-gray-400 rounded-r"
            onClick={() => dispatch(getSort('price'))}
          >
            Sort by price
          </button>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            Total sum: {currencySymbol}
            {(totalSum * ratesMultiplier).toFixed(2)}
          </div>
          <Link id="#order-count" className="flex items-center" to="/basket">
            <div>{basketQuantity > 0 ? basketQuantity : this}</div>
            <img
              className="ml-4 sbg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
              alt="basket"
              src="https://img.icons8.com/windows/28/000000/shopping-cart.png"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default React.memo(Header)
