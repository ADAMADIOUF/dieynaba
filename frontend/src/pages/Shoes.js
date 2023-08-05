import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillBasketFill, BsFillHeartFill } from 'react-icons/bs'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import QuickView from '../components/QuickView'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'

const Shoes = () => {
  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const [likedProducts, setLikedProducts] = useState({})

  const [selectedProduct, setSelectedProduct] = useState(null)

  const { data: products, isLoading: loading, error } = useGetProductsQuery()

  const handleQuickView = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseQuickView = () => {
    setSelectedProduct(null)
  }

  const handleLikeToggle = (productId) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }))
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  const shoes = products.filter((product) => product.category === 'shoes')

  return (
  
      
    <div className='tableware section-center'>
      <article className='first-categories-slider-products'>
        <div className='table-products'>
          {shoes.map((product) => {
            const { image, name, price, _id } = product

            return (
              <div key={_id} className='products-details'>
                <Link to={`/product/${_id}`}>
                  <img src={image} alt='' className='products-img-table' />
                </Link>
                <div className='view-cart'>
                  <span onClick={() => handleLikeToggle(_id)}>
                    {likedProducts[_id] ? (
                      <BsFillHeartFill style={{ color: 'red' }} />
                    ) : (
                      <BsFillHeartFill />
                    )}
                  </span>

                  <span onClick={() => handleQuickView(product)}>
                    <BsFillBasketFill />
                  </span>
                </div>
                <h3
                  className='shopping-cart'
                  onClick={() => addToCartHandler(product, 1)}
                >
                  <span className='cart-product'>
                    <FaShoppingCart />
                    <span> ajouter au panier</span>
                  </span>
                </h3>
                <h3>{name}</h3>
                <p>{price}CFA</p>
              </div>
            )
          })}
        </div>
      </article>

      {selectedProduct && (
        <QuickView product={selectedProduct} onClose={handleCloseQuickView} />
      )}
    </div>
   
  )
}

export default Shoes
