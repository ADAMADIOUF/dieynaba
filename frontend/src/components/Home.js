import React from 'react'
import ProductSlider from './ProductSlider'
import FirstProducts from '../pages/FirstProducts'
import HomeTissue from '../components/HomeTissue'
import HomeTableWare from '../components/HomeTableWare'
import HomeWoman from '../components/HomeWoman'
import HomeBag from '../components/HomeBag'
import HomeShoes from '../components/HomeShoes'
import FirstCategories from "../components/FirstCategories"
import SecondCategories from "../components/SecondCategories"
const Home = () => {
  return (
    <div>
      <ProductSlider />
      <FirstProducts />
      <HomeTableWare />
      <FirstCategories />
      <HomeTissue />
      <HomeBag/>
      <HomeWoman/>
      <SecondCategories/>
      <HomeShoes/>
    </div>
  )
}

export default Home