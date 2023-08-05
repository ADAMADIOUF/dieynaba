import React from 'react'
import FirstProducts from '../pages/FirstProducts'
import Slider from './Slider'
import HomeTableWare from './HomeTableWare'
import HomeTissue from './HomeTissue'
import FirstCategories from './FirstCategories'
import HomeBag from './HomeBag'
import HomeWoman from './HomeWoman'
import HomeShoes from './HomeShoes'
import SecondCategories from './SecondCategories'

const Home = () => {
  return (
    <div>
      <Slider/>
     <FirstProducts/>
     <HomeTableWare/>
     <FirstCategories/>
     <HomeTissue/>
     <HomeBag/>
     <HomeWoman/>
     <SecondCategories/>
     <HomeShoes/>
    </div>
  )
}

export default Home