import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import '../styles/home.css'

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
      <div className='container menu'>
        {foodCategory?.map((item: any) => (
          <>
            {console.log(item)}
            <div className='fs-4 font-weight-bold' key={item._id}>{item.CategoryName}
              {foodItems.filter((foodData: any) => foodData.CategoryName === item.CategoryName).map((subItem: any) => (
                <Card key={subItem._id}
                  title={subItem.name}
                  description={subItem.description}
                  options={subItem.options[0]}
                  img={subItem.img} />
              ))}
            </div>
          </>
        ))}
      </div>
      <div></div>
      <div><Footer /></div>
    </>

  )
}

export default Home