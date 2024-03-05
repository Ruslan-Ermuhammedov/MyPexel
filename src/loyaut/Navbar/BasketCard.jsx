import React, { useContext, useEffect, useState } from 'react'
import BasketCadrUi from './BasketCadrUi'
import { StateContext } from '../../App'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import Empty from '../../assets/images/BasketDefout.png'
function BasketCard({ basketApi }) {
  const { basketId, token,setApiLenght } = useContext(StateContext);
  const [Hato,setHato]=useState()
  // console.log(basketApi)
  useEffect(() => {
    if (basketApi) {
      setApiLenght(basketApi.length);
    }
  }, [basketApi, setApiLenght]);

  const DownloadAll = () => {
    function downloadData() {
      axios.get(`${baseUrl}cart-download/${basketId}/`, {
        headers: {
          Authorization:`Token ${token} ` , // Include the authentication token in the headers
        },
        responseType: 'blob', // Specify that the expected response is a binary blob
      })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'cart_images.zip'); // Specify the desired filename
          document.body.appendChild(link);
          link.click();
          window.location.reload();

        })
        .catch((err) =>setHato(err) );
    }
    downloadData()
  }
  return (

    <div className=''>

      <div className=' w-full px-4 py-2 flex flex-col cursor-pointer gap-3  overflow-x-auto max-h-[460px] hide-scroll'>
        {
          basketApi && basketApi.map((item, index) => <BasketCadrUi key={index + 1} item={item} />)
        }
      </div>
      {
        basketApi?.length >=1 ?
      
      <div className='w-[87%] left-7 h-[155px] fixed bottom-1 bg-white  border-t border-gray-300 '>
        <div className='flex flex-row items-center w-full m-auto justify-between  py-2 border-b border-gray-200 pb-3 '>
          <h1 className='text-xl font-medium text-[#171717]'>Total:</h1>
          <h1 className='text-xl font-medium text-[#171717]'>{basketApi.length}</h1>
        </div>
        <button onClick={DownloadAll} className='w-[310px] ml-[10px] bg-[#6999ff] text-white rounded-3xl py-2 text-xl mt-5'>Download All</button>
      </div>
      :  <div className=' '>
        <img src={Empty} className=' pt-[30%]' alt="hato" />
        </div>
      }
  
      
      </div>
  )
}

export default BasketCard
