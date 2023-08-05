import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
function Home() {
  return (
    <>
      <div><Navbar /></div>
      <div><Carousel /></div>
      <div><Card /></div>
      <div><Footer /></div>
    </>

  )
}

export default Home