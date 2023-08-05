import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savesShippingAddress } from '../slices/cartSlice'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    dispatch(savesShippingAddress({ address, city, postalCode, country }))
    navigate(`/placeorder`)
  }

  return (
    <div className='section-center'>
      <h1>Livraison</h1>
      <form className='shipping-form' onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='address'>Adresse</label>
          <input
            type='text'
            id='address'
            className='form-control'
            placeholder='Entrez votre adresse'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>Ville</label>
          <input
            type='text'
            id='city'
            className='form-control'
            placeholder='Entrez votre ville'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='postalCode'>Code postal</label>
          <input
            type='text'
            id='postalCode'
            className='form-control'
            placeholder='Entrez votre code postal'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>Pays</label>
          <input
            type='text'
            id='country'
            className='form-control'
            placeholder='Entrez votre pays'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary my-2'>
          Continuer
        </button>
      </form>
    </div>
  )
}

export default Shipping
