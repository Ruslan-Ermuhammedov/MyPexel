import React, { useEffect, useState } from 'react'
import { baseUrl, imageUrl } from '../../constants/baseUrl'
import axios from 'axios';
import { useContext } from 'react';
import { StateContext } from '../../App';
// import { MdDeleteForever } from "react-icons/md";

function BasketCadrUi({ item }) {
    // console.log(item)
    const { token, update, setUpdate } = useContext(StateContext)
    const DeleteBasket = () => {
        // alert(item.id)
        setUpdate(prevUpData => prevUpData + 2)
        // const Id = { 'image_ids': [item.id] }


        function basketPostData() {
            axios.delete(`${baseUrl}cart/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Include the authentication token in the headers
                },
                data: {
                    image_ids: [item.id],
                },
            })
                .then((res) => {
                    setUpdate(prevUpData => prevUpData + 2)

                    // console.log(res.data?.cart_id)
                }
                )
                .catch((err) => 
                {
                    alert("Not Authorized")
                    // console.error(err)
                }
                    )
        }
        basketPostData()
    }

    return (
        <div className=' w-[320px] snap-always snap-center   flex flex-row items-center px-5 py-4 border-b gap-16 ml-2  '>

            <img className=' w-20 bg-[#f8f8f8]' src={`${imageUrl}${item?.url}`} alt="" />

            <h1 className=' text-xl text w-20 font-mono'>{item?.name.slice(0, 9)}...</h1>

            <button onClick={DeleteBasket} className='    '>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="12.728" width="3" height="18" transform="rotate(45 12.728 0)" fill="#fe0000" />
                    <rect y="2.12134" width="3" height="18" transform="rotate(-45 0 2.12134)" fill="#fe0000" />
                </svg>
            </button>
        </div>
    )
}

export default BasketCadrUi
