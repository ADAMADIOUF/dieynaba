import React from 'react'
import Navbar from './components/Navbar'
import Slider from './components/ProductSlider'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WhatsAppButton from './components/WhatsAppButton'

const App = () => {
  return (
    <>
      <Navbar />

      <Outlet />
      <ToastContainer />
      <WhatsAppButton />
    </>
  )
}

export default App