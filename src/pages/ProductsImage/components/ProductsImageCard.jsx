import React from 'react'
import ProductsImageCardUi from './ProductsImageCardUi'
import "../components/ProductsImageCardUi.css"
import SearchEmpty from '../../../assets/images/EmptySearcha.png'
function ProductsImageCard({productsImg}) {
// console.log(productsImg.length)
  return (
    <div className='row '>
      <div className='card-columns'>
        
      {
        productsImg.length >= 1 ?  productsImg.map((image,index)=>(
        <ProductsImageCardUi image={image} key={index+1}/>
        ))
        :
        <div className=' flex  flex-col  gap-5  w-[100px] '>
          <img className='  absolute w-[1000px] left-[23%]    ' src={SearchEmpty} alt="" />

         <h1 className=' absolute text-xl font-medium italic text-[#acacac] left-[44%]'>Searched Image Not Found</h1>
         </div>
      }
        </div>
      
    </div>
  )
}

export default ProductsImageCard


