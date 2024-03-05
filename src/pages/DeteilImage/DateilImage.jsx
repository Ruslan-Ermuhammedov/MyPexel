import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { baseUrl, imageUrl } from '../../constants/baseUrl'
import { useParams } from 'react-router-dom'
import { FiDownload } from "react-icons/fi";
import { LuShare2 } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { StateContext } from '../../App';
import '../DeteilImage/Deteil.css'; // CSS faylini yoqishingiz kerakz
import '../ProductsImage/components/ProductsImageCardUi.css'
import ProductsImageCardUi from '../ProductsImage/components/ProductsImageCardUi';
// import { useCategoriesDetailQuery, useFilteredItemQuery } from '../../services/categoriesApi';
import { useProductsImageDetailQuery } from '../../services/productsImageApi';
import { useFilteredItemQuery } from '../../services/categoriesApi';
import { TailSpin } from 'react-loader-spinner';
import { useAddBasketMutation } from '../../services/basketApi';
import DateilImageCard from './DateilImageCard';
import Ats1 from '../../assets/images/Ats1.jpg'
import Ats2 from '../../assets/images/Ats2.jpg'
import Ats3 from '../../assets/images/Ats3.jpg'
import Ats4 from '../../assets/images/Ats4.jpg'
import Ats5 from '../../assets/images/Ats5.jpg'
import Ats6 from '../../assets/images/Ats6.jpg'
function DateilImage() {
    const sliderImages = [
        Ats1,
        Ats2,
        Ats3,
        Ats4,
        Ats5,
        Ats6,
    ];
    // const [ProductsImageDetail, setProductisDeteil] = useState("")
    const { productsImg, token, setUpdate, basketErrModal, setBasketErrModal, setBasketId, deteilChildId, setDeilChildId } = useContext(StateContext)
    // const [filter,setFilter]=useState([])
    const { id } = useParams()
    const { data: ProductsImageDetail, isSuccess: isSuccessProductsImageDetail, isLoading: isLoadingProductsImageDetail } = useProductsImageDetailQuery(id)

    // console.log(ProductsImageDetail)
    // console.log(ProductsImageDetail?.categories)
    // console.log(ProductsImageDetail?.image)

    const [images, setImages] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(images)
    useEffect(() => {
        fetchImages(`${baseUrl}ctg-filter/`);
    }, []); // Fetch images when the component mounts

    const fetchImages = (url) => {
        if (loading) return; // Prevent multiple requests
        setLoading(true);

        axios.get(url)
            .then(response => {
                const data = response.data;

                // If fetching the first page, clear existing images
                if (!nextPageUrl) {
                    setImages([]);
                }

                // Update images state
                setImages(prevImages => [...prevImages, ...data.results.category_imgs]);

                // Update nextPageUrl state
                setNextPageUrl(data.next || '');
                setLoading(false); // Reset loading flag
            })
            .catch(error => {
                // console.error('Error fetching images:', error);
                setLoading(false); // Reset loading flag
            });
    };

    useEffect(() => {
        function filterData() {
            setImages([]); // Clear existing images
            setNextPageUrl(''); // Reset pagination URL
            fetchImages(ProductsImageDetail?.categories && `${baseUrl}ctg-filter/${ProductsImageDetail?.categories}/`
            );
        }
        if (ProductsImageDetail) filterData()
    }, [ProductsImageDetail])
    // console.log(ProductsImageDetail?.categories)
    useEffect(() => {
        let isFetching = false;

        const handleScroll = () => {
            const scrollThresholdRatio = 0.8; // Adjust this ratio as needed

            // Calculate the remaining distance to the bottom of the page
            const remainingDistance = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

            // Calculate the threshold based on the remaining distance
            const scrollThreshold = window.innerHeight * scrollThresholdRatio;

            // Check if the user has scrolled to within the threshold of the bottom of the page
            if (!isFetching && remainingDistance <= scrollThreshold) {
                if (nextPageUrl) {
                    isFetching = true;
                    fetchImages(nextPageUrl)
                        .then(() => {
                            isFetching = false;
                        })
                        .catch((error) => {
                            // console.error('Error fetching next page:', error);
                            isFetching = false;
                        });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextPageUrl]);

    const handleDownload = () => {
        // Construct the full image URL
        const downloadUrl = `${imageUrl}${ProductsImageDetail?.image}`;

        // Fetch the image data
        fetch(downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a Blob URL for the image data
                const blobUrl = window.URL.createObjectURL(blob);

                // Create an anchor element for downloading
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `${ProductsImageDetail?.image}`; // Set a default filename or derive it from the image URL
                link.click();

                // Revoke the Blob URL to free up resources
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(error => console.error('Error fetching image:', error));
    };
    const [addBasket] = useAddBasketMutation();
    const AddBasketHaendlear = async () => {

        try {
            if (token) {
                const response = await addBasket(ProductsImageDetail.id);
                setBasketId(response?.data?.cart_id);
            } else {
                //   alert("Not Authorized");
                setBasketErrModal(p => !p)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const [showNotification, setShowNotification] = useState(false);
    const handleCopyClick = () => {
        try {
            const currentUrl = window.location.href;
            const tempElement = document.createElement('span');
            tempElement.textContent = currentUrl;
            document.body.appendChild(tempElement);
            const range = document.createRange();
            range.selectNode(tempElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            document.body.removeChild(tempElement);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 1000);
            // console.log('URL copied to clipboard:', currentUrl);
        } catch (error) {
            // console.error('Error copying URL to clipboard:', error);
        }
    };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [sliderImages]);

    return (
        <div>


            <div className='  flex flex-row gap-10 p-12 px-40 '>

                <div className='w-[1000px] h-[530px] flex items-center justify-center  bg-[url("https://img.lovepik.com/element/40203/0865.png_1200.png")] '>
                    {isLoadingProductsImageDetail && <h1>Loading..</h1>}
                    {isSuccessProductsImageDetail &&
                        <img src={`${imageUrl}${ProductsImageDetail?.image}`} className=' w-auto h-full   ' alt={`${imageUrl}${ProductsImageDetail.image}`} />
                    }
                </div>

                <div className='  w-80 flex flex-col gap-4 '>
                    <div className="overflow-hidden w-full h-96 relative">
                        <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                            {sliderImages.map((image, index) => (
                                <img key={index} src={image} alt="" className="w-full h-full object-cover" />
                            ))}
                            {/* Duplicate the first image to create a smooth transition from the last to the first */}
                            <img src={sliderImages[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <button onClick={handleDownload} className='w-full h-[48px]  rounded-[10px] bg-[#54C1FA] outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'> <FiDownload className='w-6 h-6 m-auto text-white outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform' /> </button>
                    <div className=' flex flex-row gap-3'>
                        <button onClick={handleCopyClick} className='w-[156px] h-[46px] bg-[#6D71F9] rounded-[10px] text-white flex items-center justify-center outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'><FaRegCopy className='w-5 h-5  ' /></button>
                        {showNotification && (
                            <div className='absolute top-[660px]   notification  animate-slideIn'>
                                <div className="  flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert">
                                    <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill_rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip_rule="evenodd"></path></svg>
                                    <div>
                                        <span className="font-medium">Url Copy Add </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button onClick={AddBasketHaendlear} className='w-[156px] h-[46px] bg-[#6D71F9] rounded-[10px] text-white flex items-center justify-center outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'>
                            <svg
                                className='w-5 h-5   '
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            >
                                <path d="M2.31669 16V2.28571H0V0H3.47503C4.11478 0 4.63338 0.51168 4.63338 1.14286V14.8571H19.0414L21.358 5.71429H6.95007V3.42857H22.8417C23.4814 3.42857 24 3.94025 24 4.57143C24 4.66487 23.9884 4.75797 23.9654 4.84862L21.0695 16.2771C20.9407 16.7859 20.4774 17.1429 19.9458 17.1429H3.47503C2.8353 17.1429 2.31669 16.6312 2.31669 16ZM4.63338 24C3.35391 24 2.31669 22.9767 2.31669 21.7143C2.31669 20.4519 3.35391 19.4286 4.63338 19.4286C5.91285 19.4286 6.95007 20.4519 6.95007 21.7143C6.95007 22.9767 5.91285 24 4.63338 24ZM18.5335 24C17.254 24 16.2169 22.9767 16.2169 21.7143C16.2169 20.4519 17.254 19.4286 18.5335 19.4286C19.813 19.4286 20.8502 20.4519 20.8502 21.7143C20.8502 22.9767 19.813 24 18.5335 24Z" fill="#ffff" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>



            <div className='px-16 py-5'>
                <div className='py-7'>
                    {
                        images ?
                            <div className='  grid grid-cols-5 gap-5'>
                                {
                                    images.map((itemImage) => (
                                        <DateilImageCard key={itemImage.id} image={itemImage} />
                                    ))
                                }
                            </div>
                            :
                            <div className='flex flex-col gap-5 w-[100px]'>
                                <img className='absolute w-[1000px] left-[23%]' src={SearchEmpty} alt="No images found" />
                                <h1 className='absolute text-xl font-medium italic text-[#acacac] left-[44%]'>No Images Found</h1>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default DateilImage
