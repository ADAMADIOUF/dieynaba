import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillBasketFill, BsFillHeartFill } from 'react-icons/bs'
import { addToCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const QuickView = ({ product, onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems, loadingCart } = cart

  const [showThankYou, setShowThankYou] = useState(false)

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
    setShowThankYou(true)

    setTimeout(() => {
      setShowThankYou(false)
    }, 3000)
  }

  return (
    <>
      <div className='quick-view-container'>
        <div className='quick-view-content'>
          <div className='quick-view-header'>
            <h2>{product.name}</h2>
            <button className='close-btn' onClick={onClose}>
              &times;
            </button>
          </div>
          <div className='quick-view-body'>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: {product.price} CFA</p>
            <div className='quick-view-actions'>
              <button onClick={() => setShowThankYou(true)}>
                <BsFillHeartFill /> Ajouter à la liste de souhaits
              </button>
              <button onClick={() => addToCartHandler(product, 1)}>
                <span className='cart-product'>
                  <FaShoppingCart />
                  <span> ajouter au panier</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showThankYou && (
        <div className='thank-you-popup'>
          <p style={{ color: 'green', textAlign: 'center' }}>Merci beaucoup!</p>
        </div>
      )}
    </>
  )
}

export default QuickView
