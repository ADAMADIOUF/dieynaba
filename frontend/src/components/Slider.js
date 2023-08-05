import React, { useState, useEffect } from 'react'
const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = [
    {
      id: 1,
      content: 'Slide 1',
      img: '/images/test11.png',
    },
    {
      id: 2,
      content: 'Slide 2',
      img: '/images/test2.png',
    },
    {
      id: 3,
      content: 'Slide 3',
      img: '/images/test3.png',
    },
  ]


  // Function to handle the next slide
  const nextSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    )
  }

  // Function to handle the previous slide
  const prevSlide = () => {
    setActiveSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    )
  }

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000) // Change slide every 3 seconds
    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <div className='slider-container'>
      <div className='slide'>
       
        <img
          src={slides[activeSlide].img}
          alt={`Slide ${slides[activeSlide].id}`}
        />
      </div>
      <ul className='active-numbers'>
        {slides.map((slide) => (
          <li
            key={slide.id}
            className={activeSlide === slide.id - 1 ? 'active' : ''}
          >
            {slide.id}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Slider