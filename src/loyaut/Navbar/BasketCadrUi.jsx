import React, { useEffect, useState } from 'react'
import { baseUrl, imageUrl } from '../../constants/baseUrl'
import axios from 'axios';
import { useContext } from 'react';
import { StateContext } from '../../App';
import { useDeleteBasketMutation } from '../../services/basketApi';
// import { MdDeleteForever } from "react-icons/md";
import XXX from '../../assets/icons/xxx.svg'
function BasketCadrUi({ item }) {
    // console.log(item)
    const { token, update, setUpdate } = useContext(StateContext)
    const [deleteBasket] = useDeleteBasketMutation()

    const DeleteBasket = () => {
        deleteBasket(item.id)
        // function basketPostData() {
        //     axios.delete(`${baseUrl}cart/`, {
        //         headers: {
        //             'Authorization': `Token ${token}`, // Include the authentication token in the headers
        //         },
        //         data: {
        //             image_ids: [item.id],
        //         },
        //     })
        //         .then((res) => {
        //             setUpdate(prevUpData => prevUpData + 2)
        //         }
        //         )
        //         .catch((err) => 
        //         {
        //             alert("Not Authorized")
        //         }
        //             )
        // }
        // basketPostData()
    }

    return (
        <div className=' w-[320px] snap-center   flex flex-row items-center justify-center px-5 py-4 border-b gap-10 ml-2  '>
            <img className=' w-20 bg-[#f8f8f8] rounded-[10px]' src={`${imageUrl}${item?.image}`} alt="" />

            <div className='text-[15px] text-[#8b8b8b] w-40  inline-block align-middle '>
                {item?.custom_name && item.custom_name.length > 10
                    ? `${item.custom_name.slice(0, 10)}...`
                    : item?.custom_name}
            </div>
            <button onClick={DeleteBasket} className='    '>
          <img src={XXX} className='w-5 h-5' alt="gh" />
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="12.728" width="3" height="18" transform="rotate(45 12.728 0)" fill="#8b8b8b" />
                    <rect y="2.12134" width="3" height="18" transform="rotate(-45 0 2.12134)" fill="#8b8b8b" />
                </svg> */}
            </button>
        </div>
    )
}

export default BasketCadrUi
