import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import '../styles/home.css'
import { useSelector } from 'react-redux'

function Home() {
  // const cartData = useSelector((state: any) => state.cartData)
  const [foodItems, setFoodItems] = useState<Array<Object>>([]);
  const [foodCategory, setFoodCategory] = useState<Array<Object>>([]);

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/displayFoodItems`, {
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
      <div className='container'>
        {foodCategory?.map((item: any) => (
          <>
            <div style={{ marginTop: "15px" }} key={item._id}><h3 style={{ paddingLeft: "12px", marginBottom: '0px' }}>{item.CategoryName}</h3>
              <div className="menu">
                {foodItems.filter((foodData: any) => foodData.CategoryName === item.CategoryName).map((subItem: any) =>
                (<>
                {console.log("this is our subitem", subItem)}
                  <Card foodItem={subItem}
                    options={subItem.options[0]}
                  />
                </>

                ))}
              </div>
            </div>
          </>
        ))}
      </div>
      <div><Footer /></div>
    </>

  )
}

export default Home
