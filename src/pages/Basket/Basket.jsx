// import React, { useContext, useEffect, useState } from 'react'
// import BasketCadrUi from './BasketCadrUi'
// import axios from 'axios';
// import { StateContext } from '../../App';
// import { basketUrl } from '../../constants/baseUrl';
// import BasketCard from './BasketCard';

// function Basket() {
//   const { basketId } = useContext(StateContext)
// const [basketApi,setBasketApi]=useState()
//   useEffect(() => {
//     function basketData() {
//       axios.get(`${basketUrl}${basketId}/`)
//         .then((res) => setBasketApi(res.data?.images))
//         .catch((err) => console.error(err))
//     }
//     basketData()
//   }, []);
//   console.log(basketApi)
//   return (
//     <div>
//       <div className='w-full' >

// {
//   basketApi && <BasketCard basketApi={basketApi}/> 
// }
        

//       </div>
//     </div>
//   )
// }

// export default Basket
