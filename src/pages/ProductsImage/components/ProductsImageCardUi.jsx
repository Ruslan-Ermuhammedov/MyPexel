import React, { useContext, useState } from 'react';
import { FiDownload } from "react-icons/fi";
import { baseUrl, imageUrl } from '../../../constants/baseUrl';
import { NavLink, useNavigate } from 'react-router-dom';
import BgImage from '../../../assets/images/check_1.jpg'
import BgImage2 from '../../../assets/images/check_2.jpg'
import { StateContext } from '../../../App';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAddBasketMutation } from '../../../services/basketApi';
import { useCategoriesDetailQuery } from '../../../services/categoriesApi';
// import '../components/ProductsImagesApi.css'
import '../components/ProductsImageCardUi.css'
import Reminder from '../../../assets/images/Reminder.png'
import XXX from '../../../assets/icons/xxx.svg'
import BasketErrorModal from '../../DeteilImage/BasketErrorModal';

function ProductsImageCardUi({ image }) {
  const [iconVisible, setIconVisible] = useState(false);
  const { basketState, update, setUpdate,basketErrModal, setBasketErrModal, basketDispatch, token, deteilChildId, basketId, setBasketId } = useContext(StateContext);
  // const { data:CategiryDetail ,isSuccess: isSuccessCategoriesDetail, isLoading: isLoadingCategoriesDetail } = useCategoriesDetailQuery(image.id)
const [Active,setActive]=useState(false)
  const navigate = useNavigate();

  const [Hato, setHato] = useState();
  const deteilHaendlear = () => {
    
    navigate(`/deteil/${image.id}`);
    // window.location.reload();
  };
  const handleDownload = () => {
    const downloadUrl = `${imageUrl}${image.image}`;
    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${image.custom_name}.png`;
        link.click();

        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => setHato('Error fetching image:', error));
  };

  
  
  const [addBasket] = useAddBasketMutation();
  const AddBasketHaendlear = async () => {
    try {
      if (token) {
        const response = await addBasket(image.id);
        setBasketId(response?.data?.cart_id);
      } else {
        setBasketErrModal(true)
        // alert("Not Authorized");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // function basketPostData() {
  //   axios.post(`${baseUrl}cart/`, Id, {
  //     headers: {
  //       'Authorization': `Token ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       setUpdate(prevUpData => prevUpData + 2);
  //       setBasketId(res.data?.cart_id);
  //     })
  //     .catch((err) => {
  //       alert("Not Authorized");
  //       setHato(err);
  //     });
  // }

  // basketPostData();
  // };

  return (
    <>
      {/* <div className={` bg-[#00000042] absolute w-[100%] h-screen top-0 left-0 z-40 backdrop-blur-[0.5px]  transition-all duration-500 ${basketErrModal ? '' : 'hidden'}  `} onClick={BasketModal}>

      </div>
      <div className={` absolute bg-white rounded-xl w-[340px] h-[365px] ${basketErrModal ? ' top-[152px]' : '-top-96'} z-50 shadow-md shadow-[#646464cc]  left-[40%] transition-all duration-700   `}>
        <div>
          <div className='w-full  h-44 bg-[#dfdfdf] rounded-t-xl   '>
            <img className=' object-contain w-[290px]  m-auto' src={Reminder} alt="" />
            <img onClick={BasketModal} className=' absolute top-3 left-[315px] w-3 h-3' src={XXX} alt="" />
          </div>
          <div className=' flex flex-col gap-2 items-center  pt-4'>
            <h1 className='  font-semibold text-[26px] text-zinc-600 '>Hello, there </h1>
            <h1 className=' text-[18px] w-80 font-medium text-zinc-500  text-center '>Please sign in or sign up in order to use cart</h1>
            <button className=' rounded bg-[#6999ff] px-5 py-2  text-[18px] text-white '><NavLink to={"/login"}> Log In</NavLink></button>
          </div>
        </div>
      </div> */}


      <div
        onMouseEnter={() => setIconVisible(true)}
        onMouseLeave={() => setIconVisible(false)}
        className=' rounded-lg  h-[300px]   flex  flex-row   bg-[url("https://i.postimg.cc/fbpx3p5Y/check-3.jpg")] shadow shadow-zinc-200 justify-center    '>
        <LazyLoadImage
          className={` rounded-3xl w-full h-full   object-contain cursor-pointer `}
          src={`${imageUrl}${image.image}`}
          alt="hato"
          // style={{ cursor: 'pointer', minHeight: "150px", minWidth: "250px" }}
          onMouseEnter={() => setIconVisible(true)}
          onMouseLeave={() => setIconVisible(false)}
          onClick={deteilHaendlear}
          effect="blur"
          delayMethod="throttle"
        />
        
        {iconVisible && (
          <div onClick={deteilHaendlear}

            onMouseEnter={() => setIconVisible(true)}
            onMouseLeave={() => setIconVisible(false)}
            className={`bg-gradient-to-t cursor-pointer absolute w-[17.5%]  rounded-lg  h-[300px] from-[#00000039] outline-none focus:ring-4 shadow-sm transform  transition-transform   z-[5]`}
          >           
          </div>
        )}
     {iconVisible && (
            <button
              onClick={AddBasketHaendlear}
              onMouseEnter={() => setIconVisible(true)}
              onMouseLeave={() => setIconVisible(false)}
              className='text-3xl z-20 absolute    mt-[14%] ml-[15%]   text-[#612fea] font-bold outline-none shadow-sm transform active:scale-90 transition-transform'
            >
              <svg
                className='w-6 h-6'
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              >
                <path d="M2.31669 16V2.28571H0V0H3.47503C4.11478 0 4.63338 0.51168 4.63338 1.14286V14.8571H19.0414L21.358 5.71429H6.95007V3.42857H22.8417C23.4814 3.42857 24 3.94025 24 4.57143C24 4.66487 23.9884 4.75797 23.9654 4.84862L21.0695 16.2771C20.9407 16.7859 20.4774 17.1429 19.9458 17.1429H3.47503C2.8353 17.1429 2.31669 16.6312 2.31669 16ZM4.63338 24C3.35391 24 2.31669 22.9767 2.31669 21.7143C2.31669 20.4519 3.35391 19.4286 4.63338 19.4286C5.91285 19.4286 6.95007 20.4519 6.95007 21.7143C6.95007 22.9767 5.91285 24 4.63338 24ZM18.5335 24C17.254 24 16.2169 22.9767 16.2169 21.7143C16.2169 20.4519 17.254 19.4286 18.5335 19.4286C19.813 19.4286 20.8502 20.4519 20.8502 21.7143C20.8502 22.9767 19.813 24 18.5335 24Z" fill="#ffff" />
              </svg>
            </button>
          )}
          {iconVisible && (
            <FiDownload
              onMouseEnter={() => setIconVisible(true)}
              onMouseLeave={() => setIconVisible(false)}
              onClick={handleDownload}
              className=' cursor-pointer z-20 text-3xl   absolute    mt-[17%] ml-[15%] text-[#ffffff] font-bold outline-none focus:ring-4 shadow-sm transform active:scale-90 transition-transform'
            />
          )}
        <div className=''>
          {/* {iconVisible && (
            <FiDownload
              onMouseEnter={() => setIconVisible(true)}
              onMouseLeave={() => setIconVisible(false)}
              onClick={handleDownload}
              className='h-auto cursor-pointer z-20 text-3xl absolute bottom-3 left-[93%] text-[#ffffff] font-bold outline-none focus:ring-4 shadow-sm transform active:scale-90 transition-transform'
            />
          )} */}
          {/* {iconVisible && (
            <button
              onClick={AddBasketHaendlear}
              onMouseEnter={() => setIconVisible(true)}
              onMouseLeave={() => setIconVisible(false)}
              className='text-3xl z-20 absolute bottom-[58px] left-[94%] text-[#612fea] font-bold outline-none shadow-sm transform active:scale-90 transition-transform'
            >
              <svg
                className='w-6 h-6'
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              >
                <path d="M2.31669 16V2.28571H0V0H3.47503C4.11478 0 4.63338 0.51168 4.63338 1.14286V14.8571H19.0414L21.358 5.71429H6.95007V3.42857H22.8417C23.4814 3.42857 24 3.94025 24 4.57143C24 4.66487 23.9884 4.75797 23.9654 4.84862L21.0695 16.2771C20.9407 16.7859 20.4774 17.1429 19.9458 17.1429H3.47503C2.8353 17.1429 2.31669 16.6312 2.31669 16ZM4.63338 24C3.35391 24 2.31669 22.9767 2.31669 21.7143C2.31669 20.4519 3.35391 19.4286 4.63338 19.4286C5.91285 19.4286 6.95007 20.4519 6.95007 21.7143C6.95007 22.9767 5.91285 24 4.63338 24ZM18.5335 24C17.254 24 16.2169 22.9767 16.2169 21.7143C16.2169 20.4519 17.254 19.4286 18.5335 19.4286C19.813 19.4286 20.8502 20.4519 20.8502 21.7143C20.8502 22.9767 19.813 24 18.5335 24Z" fill="#ffff" />
              </svg>
            </button>
          )} */}
        </div>
      </div>
    </>
  );
}

export default ProductsImageCardUi;
