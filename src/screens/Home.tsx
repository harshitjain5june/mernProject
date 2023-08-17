import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import { dividerClasses } from '@mui/material'
function Home() {

  const [foodItems, setFoodItems] = useState(Array<Object>);
  const [foodCategory, setFoodCategory] = useState(Array<Object>);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8090/api/displayFoodItems', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const foodData = await response.json();
    console.log(foodData);
    setFoodItems(foodData[0]);
    setFoodCategory(foodData[1]);
  }

  useEffect(() => {
    fetchData();

  }, [])

  useEffect(() => {
    console.log(foodItems);
    console.log(foodCategory);
  }, [foodItems, foodCategory])


  return (
    <>
      <div><Navbar /></div>
      <div><Carousel /></div>
      <div>
        {foodCategory?.map((item: any) => (
          <>
            {console.log(item)}
            <div key={item._id}>{item.CategoryName}</div>
          </>
        ))}
      </div>
      <div><Card /></div>
      <div><Footer /></div>
    </>

  )
}

export default Home