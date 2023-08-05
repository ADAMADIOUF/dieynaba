import React, { useState } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../slices/productsApiSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'

const SingleProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: productId } = useParams()

  const [qty, setQty] = useState(1)

  const {
    data: product,
    isLoading: loading,
    error,
  } = useGetProductByIdQuery(productId)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate(`/cart`)
  }

  const increaseQty = () => {
    if (qty < product.countInStock) {
      setQty((prevQty) => prevQty + 1)
    }
  }

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1)
    }
  }
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}-${month}-${year}`
}
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <div className='section-center single-product'>
      <div className='container-single-product'>
        <article className='single-img'>
          <img src={product.image} alt={product.name} />
        </article>
        <article className='single-details'>
          <h3>{product.name}</h3>
          <h3>{product.price} CFA</h3>
          <div className='add-to-cart-qty'>
            <strong>
              {product.countInStock > 0 ? 'En stock' : 'Indisponible'}
            </strong>
            <div>
              {product.countInStock > 0 && (
                <div className='list-group-item'>
                  <div className='row'>
                    <div className='col'>Quantité</div>
                    <div className='col'>
                      <div className='qty-container'>
                        <button onClick={decreaseQty}>-</button>
                        <span>{qty}</span>
                        <button onClick={increaseQty}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className='btn-block'
              type='button'
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Ajouter au panier
            </button>
          </div>
        </article>
      </div>
      <div className='details-single-products'>
        <button className='btn-details'>Details du produit</button>
        <div className='single-product-box'>
          <h3>
            <span>Nom du produit:{product.name}</span>
          </h3>
          <h3>
            <span>Descriptions:{product.description}</span>
          </h3>
          <h3>
            <span>Référence:{product._id}</span>
          </h3>
          <h3>
            <span>Date de disponibilité: {formatDate(product.createdAt)}</span>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
