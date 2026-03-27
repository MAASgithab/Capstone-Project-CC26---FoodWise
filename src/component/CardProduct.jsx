import React from 'react'
import { Card } from "flowbite-react";



export default function CardProduct() {
  return (
    <>
    <div><h2 className='text-4xl'>Our Products</h2></div>
    <div className='flex flex-row justify-center gap-5'>
      <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/images/bagcompost.png"
    >
    </Card>
      <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/images/kompos.png"
    >
    </Card>
      <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/images/maggots.png"
    >
    </Card>
    </div>
    </>  
    )
}
