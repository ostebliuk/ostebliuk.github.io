import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItems, addItem } from '../redux/reducers/items'
import { getInitialCurrency } from '../redux/reducers/currency'
import { getLogFile } from '../redux/reducers/logs'

const Main = () => {
  const itemsList = useSelector((s) => s.items.list)
  const ratesMultiplier = useSelector((s) => s.currency.multiplier)
  const currencySymbol = useSelector((s) => s.currency.symbol)
  const amount = useSelector((s) => s.items.amounts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
    dispatch(getInitialCurrency())
    dispatch(getLogFile())
  }, [])

  return (
    <div className="card flex flex-wrap justify-center">
      {itemsList.map((it) => (
        <div
          className="flex flex-col m-4 w-64 h-56 bg-gray-100 rounded-lg overflow-hidden font-semibold"
          key={it.id}
        >
          <img className="object-scale-down w-full h-32" alt="item" src={it.image} />
          <div className="card__title pl-4 pt-4">{it.title}</div>
          <div className="justify-end m-4">
            <div className="flex justify-between">
              <div className="card__price flex">
                <div className="currency">{currencySymbol}</div>
                <div className="card__price">
                  {typeof ratesMultiplier !== 'undefined'
                    ? (it.price * ratesMultiplier).toFixed(2)
                    : ''}
                </div>
              </div>
              <div className="flex">
                {amount[it.id]}
                <button
                  className="ml-2"
                  type="button"
                  onClick={() => {
                    dispatch(addItem(it, it.id, it.price))
                  }}
                >
                  <img
                    className="card__image bg-white hover:bg-gray-100 text-gray-800 font-semibold px-1 border border-gray-400 rounded shadow"
                    alt="basket"
                    src="https://img.icons8.com/windows/28/000000/shopping-cart.png"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
