import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems, loading } = cart

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className='cart-screen section-center'>
      <div className='cart-items'>
        <h1 className='cart-heading'>Panier d'Achat</h1>
        {cartItems.length === 0 ? (
          <h3>
            Votre panier est vide. <Link to={`/`}>Retour</Link>
          </h3>
        ) : (
          <ul className='cart-list'>
            {cartItems.map((item) => (
              <li key={item._id} className='cart-item'>
                <div className='cart-item-details'>
                  <div className='cart-item-image'>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className='cart-item-info'>
                    <Link
                      to={`/product/${item._id}`}
                      className='cart-item-name'
                    >
                      {item.name}
                    </Link>
                    <p>{item.price} F CFA</p>
                  </div>
                </div>
                <div className='cart-item-actions'>
                  <div className='cart-item-quantity'>
                    <button
                      onClick={() => addToCartHandler(item, item.qty - 1)}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => addToCartHandler(item, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className='cart-item-remove'
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='cart-summary'>
        <div className='cart-summary-heading'>
          <h2>
            Sous-total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            articles
          </h2>
          <p>
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}{' '}
            F CFA
          </p>
        </div>
        <button
          className='cart-summary-button'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Passer à la Commande
        </button>
      </div>
    </div>
  )
}

export default Cart
