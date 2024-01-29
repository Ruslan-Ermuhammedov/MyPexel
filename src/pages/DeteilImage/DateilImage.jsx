import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { baseUrl, imageUrl } from '../../constants/baseUrl'
import { useParams } from 'react-router-dom'
import { FiDownload } from "react-icons/fi";
import { LuShare2 } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { StateContext } from '../../App';

import '../ProductsImage/components/ProductsImageCardUi.css'
import ProductsImageCardUi from '../ProductsImage/components/ProductsImageCardUi';
function DateilImage() {
    const [profuctsDeteil, setProductisDeteil] = useState("")
    const { productsImg, token, setUpdate, setBasketId, deteilChildId, setDeilChildId } = useContext(StateContext)
    // const [filter,setFilter]=useState([])
    const [apiImg, setApiImg] = useState([])
    const { id } = useParams()
    // console.log(id)
    const [Hato,setHato]=useState()
    useEffect(() => {
        function deteilData() {
            axios
                .get(`${baseUrl}main/${id}/`)
                .then((res) => setProductisDeteil(res.data))
                .catch((error) => setHato(error))
        }
        deteilData()
    }, [])

    useEffect(() => {
        function imgData() {
            axios.get(`${baseUrl}main/`)
                .then((res) => {
                    setApiImg(res.data?.result)
                }
                )
                .catch(() => {
                    setHato("hatolik bor")
                }
                )
        }
        imgData()
    }, []);
    const filter = apiImg.filter((item) => item.categories === profuctsDeteil.categories)


    console.log(profuctsDeteil.categories)
    const handleDownload = () => {
        // Construct the full image URL
        const downloadUrl = `${imageUrl}${profuctsDeteil.image}`;

        // Fetch the image data
        fetch(downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a Blob URL for the image data
                const blobUrl = window.URL.createObjectURL(blob);

                // Create an anchor element for downloading
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'downloaded_image.png'; // Set a default filename or derive it from the image URL
                link.click();

                // Revoke the Blob URL to free up resources
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(error => console.error('Error fetching image:', error));
    };

    const Id = { 'image_ids': [profuctsDeteil.id] }
    const AddBasketHaendlear = () => {


        function basketPostData() {

            axios.post(`${baseUrl}cart/`, Id, {
                headers: {
                    'Authorization': `Token ${token}`, // Include the authentication token in the headers
                },
            })
                .then((res) => {
                    setUpdate(prevUpData => prevUpData + 2)
                    setBasketId(res.data?.cart_id)
                }
                )
                .catch((err) => {
                    alert("Not Authorized")
                }
                )
        }
        console.log(profuctsDeteil.id)
        basketPostData()


    }
    const handleCopyClick = () => {
        try {
          // Get the current page's URL
          const currentUrl = window.location.href;
    
          // Create a temporary DOM element (in this case, a span)
          const tempElement = document.createElement('span');
          tempElement.textContent = currentUrl;
    
          // Append the temporary element to the body
          document.body.appendChild(tempElement);
    
          // Create a range and select the text in the temporary element
          const range = document.createRange();
          range.selectNode(tempElement);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
    
          // Execute the copy command
          document.execCommand('copy');
    
          // Remove the temporary element from the DOM
          document.body.removeChild(tempElement);
    
          console.log('URL copied to clipboard:', currentUrl);
        } catch (error) {
          console.error('Error copying URL to clipboard:', error);
        }
      };
   
        return (
            <div>


                <div className=' flex flex-row gap-10 p-12 px-40 '>
                    <div className='w-[1000px] h-[530px] flex items-center justify-center  bg-[url("https://img.lovepik.com/element/40203/0865.png_1200.png")] '>
                        <img src={`${imageUrl}${profuctsDeteil.image}`} className=' w-auto h-full   ' alt={`${imageUrl}${profuctsDeteil.image}`} />
                    </div>
                    <div className='  w-80 flex flex-col gap-4 '>
                        <div className=' w-full h-[380px] bg-[#D9D9D9]'>

                        </div>
                        <button onClick={handleDownload} className='w-full h-[48px]  rounded-[10px] bg-[#54C1FA] outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform'> <FiDownload className='w-6 h-6 m-auto text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform' /> </button>
                        <div className=' flex flex-row gap-3'>
                            <button onClick={handleCopyClick} className='w-[156px] h-[46px] bg-[#6D71F9] rounded-[10px] text-white flex items-center justify-center outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform'><FaRegCopy className='w-5 h-5  ' /></button>
                            <button onClick={AddBasketHaendlear} className='w-[156px] h-[46px] bg-[#6D71F9] rounded-[10px] text-white flex items-center justify-center outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform'>  <svg
                                className='w-5 h-5   '
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            >
                                <path d="M2.31669 16V2.28571H0V0H3.47503C4.11478 0 4.63338 0.51168 4.63338 1.14286V14.8571H19.0414L21.358 5.71429H6.95007V3.42857H22.8417C23.4814 3.42857 24 3.94025 24 4.57143C24 4.66487 23.9884 4.75797 23.9654 4.84862L21.0695 16.2771C20.9407 16.7859 20.4774 17.1429 19.9458 17.1429H3.47503C2.8353 17.1429 2.31669 16.6312 2.31669 16ZM4.63338 24C3.35391 24 2.31669 22.9767 2.31669 21.7143C2.31669 20.4519 3.35391 19.4286 4.63338 19.4286C5.91285 19.4286 6.95007 20.4519 6.95007 21.7143C6.95007 22.9767 5.91285 24 4.63338 24ZM18.5335 24C17.254 24 16.2169 22.9767 16.2169 21.7143C16.2169 20.4519 17.254 19.4286 18.5335 19.4286C19.813 19.4286 20.8502 20.4519 20.8502 21.7143C20.8502 22.9767 19.813 24 18.5335 24Z" fill="#ffff" />
                            </svg></button>
                        </div>
                    </div>
                </div>

                <div className='px-32 py-10 row '>
                    <div className='card-columns'>
                        {filter.map((image, index) => (
                            <ProductsImageCardUi image={image} key={index + 1} />
                        ))}
                    </div>

                </div>

            </div>
        )
    }

    export default DateilImage
