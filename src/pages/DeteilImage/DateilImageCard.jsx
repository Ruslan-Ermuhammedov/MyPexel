import React, { useContext, useState } from 'react';
import { FiDownload } from "react-icons/fi";
import { baseUrl, basketUrl, imageUrl } from '../../../constants/baseUrl';
import { useNavigate } from 'react-router-dom';
import BgImage from '../../../assets/images/check_1.jpg'
import BgImage2 from '../../../assets/images/check_2.jpg'
import { StateContext } from '../../../App';
import axios from 'axios';
function DateilImageCard({ image }) {
  const [iconVisible, setIconVisible] = useState(false);
  const { basketState, basketDispatch, token,basketId,setBasketId,deteilChildId,setDeilChildId } = useContext(StateContext)
  const navigate = useNavigate()
  const [Hato,setHato]=useState()
  const deteilHaendlear = () => {
    setDeilChildId(image.id)

    // window.location.reload();

  }
  const handleDownload = () => {
    const downloadUrl = `${image.image}`;
    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${image.custom_name}.png`; // Set a default filename or derive it from the image URL
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => setHato('Error fetching image:', error));

  };
  const Id = { 'image_ids': [image.id] }
  const AddBasketHaendlear = () => {
    function basketPostData() {

      axios.post(`${baseUrl}`, Id, {
        headers: {
          'Authorization': `Token ${token}`, // Include the authentication token in the headers
        },
      })
        .then((res) => setBasketId(res.data?.cart_id))
        .catch((err) => setHato(err))
    }
    // console.log(image.id)
    basketPostData()

  }


  return (
    <div className=' card card-pin'>
      {iconVisible && (
        <div
          onClick={deteilHaendlear}
          onMouseEnter={() => setIconVisible(true)}
          onMouseLeave={() => setIconVisible(false)}
          className='  bg-gradient-to-t cursor-pointer  from-[#00000039]     duration-300 w-full h-full absolute transition'>
          {/* className=' bg-[linear-gradient(0deg, rgba(65,65,65,0.9248949579831933) 0%, rgba(206,206,206,0) 100%)] w-full h-full absolute'> */}

        </div>
      )}
      <img
        className={`  bg-[url("https://i.postimg.cc/fbpx3p5Y/check-3.jpg")] card-img `}
        src={`${imageUrl}${image.image}`}
        alt="hato"
        style={{ cursor: 'point er' }}
        onMouseEnter={() => setIconVisible(true)}
        onMouseLeave={() => setIconVisible(false)}
        onClick={deteilHaendlear}
      />
      <div className='  overlay'>

        {iconVisible && (
          <FiDownload onMouseEnter={() => setIconVisible(true)}
            onMouseLeave={() => setIconVisible(false)}
            onClick={handleDownload}
            className={`h-auto cursor-pointer text-3xl absolute bottom-3  left-[87%]  text-[#ffffff]    font-bold `} />

        )}
        {iconVisible && (

          <button
            onClick={AddBasketHaendlear}
            onMouseEnter={() => setIconVisible(true)}
            onMouseLeave={() => setIconVisible(false)}
            className='text-3xl absolute bottom-[58px]  left-[88%]  text-[#612fea]    font-bold'
          >
            <svg
              className='w-6 h-6   '
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            >
              <path d="M2.31669 16V2.28571H0V0H3.47503C4.11478 0 4.63338 0.51168 4.63338 1.14286V14.8571H19.0414L21.358 5.71429H6.95007V3.42857H22.8417C23.4814 3.42857 24 3.94025 24 4.57143C24 4.66487 23.9884 4.75797 23.9654 4.84862L21.0695 16.2771C20.9407 16.7859 20.4774 17.1429 19.9458 17.1429H3.47503C2.8353 17.1429 2.31669 16.6312 2.31669 16ZM4.63338 24C3.35391 24 2.31669 22.9767 2.31669 21.7143C2.31669 20.4519 3.35391 19.4286 4.63338 19.4286C5.91285 19.4286 6.95007 20.4519 6.95007 21.7143C6.95007 22.9767 5.91285 24 4.63338 24ZM18.5335 24C17.254 24 16.2169 22.9767 16.2169 21.7143C16.2169 20.4519 17.254 19.4286 18.5335 19.4286C19.813 19.4286 20.8502 20.4519 20.8502 21.7143C20.8502 22.9767 19.813 24 18.5335 24Z" fill="#ffff" />
            </svg>
          </button>
        )}

      </div>
    </div>
  );
}
export default DateilImageCard