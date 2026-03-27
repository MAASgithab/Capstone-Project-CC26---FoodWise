import React from 'react'
import CardProduct from '../component/CardProduct'

export default function Dashboard() {
  return (
        <>
          <div>
            <h1 className='text-center text-5xl'><b>Welcome To FoodWise</b></h1>
          </div>
          <div>
            <CardProduct />
          </div>
        </>
  )
}
