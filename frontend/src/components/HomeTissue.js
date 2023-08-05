import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillBasketFill, BsFillHeartFill } from 'react-icons/bs'
import QuickView from '../components/QuickView'
import f from '../assets/t1.png'
import Error from '../components/Error'

const HomeTissue = () => {
  const sliderRef = useRef(null)
  const sliderWrapperRef = useRef(null)
  const [sliderHovered, setSliderHovered] = useState(false)

  const handleSliderHover = () => {
    setSliderHovered((prev) => !prev)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }

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

  const handleNext = () => {
    sliderRef.current.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current.slickPrev()
  }
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }
  const tissue = products.filter(
    (product) => product.category === 'tissue'
  )
  return (
    <div className='section-center first-product'>
      <div className='image-slider-container'>
        <div className='big-image'>
          <img src={f} alt='' className='big-img' />
        </div>
        <div
          className='slider-container'
          onMouseEnter={handleSliderHover}
          onMouseLeave={handleSliderHover}
          ref={sliderWrapperRef}
        >
          <Slider ref={sliderRef} {...settings}>
            {tissue.slice(0, 5).map((product) => (
              <div key={product._id} className='first-products-details'>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt=''
                    className='first-product-img'
                  />
                </Link>
                <div className='view-cart'>
                  <span onClick={() => handleLikeToggle(product._id)}>
                    {likedProducts[product._id] ? (
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
                <h3>{product.name}</h3>
                <p>{product.price}CFA</p>
              </div>
            ))}
          </Slider>
          <button
            className={`slider-nav-btn prev-btn ${
              sliderHovered ? 'visible' : ''
            }`}
            onClick={handlePrev}
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            className={`slider-nav-btn next-btn ${
              sliderHovered ? 'visible' : ''
            }`}
            onClick={handleNext}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
      {selectedProduct && (
        <QuickView product={selectedProduct} onClose={handleCloseQuickView} />
      )}
    </div>
  )
}

export default HomeTissue
