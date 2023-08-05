import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useGetProductByIdQuery } from '../slices/productsApiSlice'
import { WhatsAppWidget } from 'react-whatsapp-widget'

const PlaceOrder = () => {
   useEffect(() => {
     window.scrollTo(0, 0)
   }, [])
   const [showWhatsAppWidget, setShowWhatsAppWidget] = useState(false)
   
   const [qty, setQty] = useState(1)
   const { id: productId } = useParams()
  
  const {
    data: product,
    isLoading,
    isError:error,
  } = useGetProductByIdQuery(productId)
  console.log('Product Data:', product)
  const cart = useSelector((state) => state.cart)

  
const handleAddToCart = () => {
  const orderDetails = cart.cartItems.map((item) => {
    return `${item.name} x${item.qty}, Price: ${item.price} F CFA`
  })

  const totalPrice = cart.totalPrice
  const shippingAddress = cart.shippingAddress

  const message = `Je veux acheter:\n${orderDetails.join(
    '\n'
  )}\nTotal Price: ${totalPrice} F CFA\nLivraison à:\n${
    shippingAddress.address
  }, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${
    shippingAddress.country
  }`

  const url = `https://wa.me/+221777393755?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

useEffect(() => {
  // Show WhatsAppWidget if product data is available and loaded
  if (product && !isLoading && !error) {
    setShowWhatsAppWidget(true)
  }
}, [product, isLoading, error])
  return (
    <>
      <div className='row section-center place-order-container'>
        <div className='col-md-8 '>
          <div className='list-group '>
            <div className='list-group-item'>
              <h2>Livraison</h2>
              <p>
                <strong>Adresse:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className='list-group-item'>
              {/* <h2>Moyen de Paiement</h2>
              <strong>Méthode :</strong> {cart.paymentMethod} */}
            </div>
            <div className='list-group-item'>
              <h2>Articles Commandés</h2>
              {cart.cartItems.length === 0 ? (
                <Loading>Votre panier est vide</Loading>
              ) : (
                <div className='list-group'>
                  {cart.cartItems.map((item, index) => (
                    <div className='list-group-item' key={index}>
                      <div className='row'>
                        <div className='col-md-1'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='img-fluid rounded'
                          />
                        </div>
                        <div className='col'>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </div>
                        <div className='col-md-4'>
                          {item.qty}x {item.price}CFA= {item.qty * item.price}
                          CFA
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <div className='list-group'>
              <div className='list-group-item'>
                <h2>Résumé de la Commande</h2>
              </div>
              <div className='list-group-item'>
                <div className='row'>
                  <div className='col'>Articles :</div>
                  <div className='col'>{cart.itemsPrice} F CFA</div>
                </div>
              </div>
              <div className='list-group-item'>
                <div className='row'>
                  <div className='col'>Livraison :</div>
                  <div className='col'>{cart.shippingPrice} F CFA</div>
                </div>
              </div>
              <div className='list-group-item'>
                <div className='row'>
                  <div className='col'>Taxes :</div>
                  <div className='col'>{cart.taxPrice} F CFA</div>
                </div>
              </div>
              <div className='list-group-item'>
                <div className='row'>
                  <div className='col'>Total :</div>
                  <div className='col'>{cart.totalPrice} F CFA</div>
                </div>
              </div>
              <div className='list-group-item'></div>
              <div className='list-group-item'>
                <button
                  type='button'
                  className='btn btn-block'
                  onClick={handleAddToCart}
                >
                  acheter par whatssap
                </button>
                {showWhatsAppWidget && (
                  <WhatsAppWidget
                    phoneNumber='+221777393755'
                    message={`Je veux acheter:\n${product?.name} x${qty}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrder
