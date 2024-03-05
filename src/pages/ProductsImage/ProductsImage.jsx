import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { baseUrl, imageUrl } from '../../constants/baseUrl';
import ProductsImageCard from './components/ProductsImageCard';
import { StateContext } from '../../App';
import { ImageAPiInitialState, ImageAPiReducer } from '../../reducer/ImagesApiReducer/ImagesAPiReducer';
import { TailSpin } from 'react-loader-spinner';
import SearchEmpty from '../../assets/images/EmptySearcha.png';
import Ally from '../../assets/images/Ally.png';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import axios from 'axios';
import '../ProductsImage/components/productsImageCardUi.css'
// import './components/ProductsImagesApi.css'
import { useProductsImageQuery, useSearchedItemQuery } from '../../services/productsImageApi';
import { useCategoriesQuery, useFilteredItemQuery } from '../../services/categoriesApi';
import { useAddBasketMutation } from '../../services/basketApi';

function ProductsImage() {
    const { categoriesImg, setCategoriesImg, productsImg, setProductsImg, quary } = useContext(StateContext);
    const [iconVisible, setIconVisible] = useState(false);

    const [queryImageApi, setQueryImageApi] = useState([]);
    const [Hato, setHato] = useState();
    const sliderRef = useRef(null);
    const { data: searchedData, isSuccess: isSuccessSearchedData, isLoading: isLodaingSearched } = useSearchedItemQuery(quary)
    // console.log(searchedData)
    const { data: categories, isSuccess: isSuccessCategories, isLoading: isLoadingCategories } = useCategoriesQuery()
    const [Category, setCategory] = useState("");

    // Images Filter Api 
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [filteredCategoriesApi, setFilteredCategoriesApi] = useState([]);
    // const [shouldFetchData, setShouldFetchData] = useState(true); // Control whether to fetch data or not
    // const { data: filteredCategories, isSuccess: isSuccessFilteredCategories, isLoading: isLoadingFilteredCategories } = useFilteredItemQuery({ Category, currentPage });
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrollPosition(window.scrollY);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);
    // useEffect(() => {
    //     setFilteredCategoriesApi([]);
    //     setCurrentPage(1);
    //     setShouldFetchData(true);
    // }, [Category]);
    // useEffect(() => {
    //     function fetchNextPage() {
    //         if (filteredCategories?.next_page_exists === true) {
    //             setCurrentPage(prevPage => prevPage + 1);
    //         }
    //     }
    //     if (filteredCategories?.next_page_exists === true && shouldFetchData) {
    //         if (scrollPosition >= (500 * currentPage)) {
    //             fetchNextPage();
    //         }
    //     }
    // }, [currentPage, scrollPosition]);
    // useEffect(() => {
    //     if (isSuccessFilteredCategories) {
    //         const uniqueImages = filteredCategories?.results?.category_imgs.filter((image) => {
    //             return !filteredCategoriesApi.some((existingImage) => existingImage.id === image.id);
    //         });
    //         setFilteredCategoriesApi((prevData) => [...prevData, ...uniqueImages]);
    //     }
    // }, [isSuccessFilteredCategories, currentPage, filteredCategoriesApi]);
    // useEffect(() => {
    //     if (filteredCategories?.next_page_exists === false) {
    //         setShouldFetchData(false);
    //     }
    // }, [filteredCategories?.next_page_exists]);



    // boshqa funtionlar




    // 
    const [images, setImages] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchImages(`${baseUrl}ctg-filter/`);
    }, []);
    const fetchImages = (url) => {
        if (loading) return;
        setLoading(true);
        axios.get(url)
            .then(response => {
                const data = response.data;

                if (!nextPageUrl) {
                    setImages([]);
                }
                setImages(prevImages => [...prevImages, ...data.results.category_imgs]);
                setNextPageUrl(data.next || '');
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setLoading(false);
            });
    };
    const handleCategoryClick = (categoryName) => {
        setImages([]);
        setNextPageUrl('');
        fetchImages(categoryName
            ? `${baseUrl}ctg-filter/${categoryName}/`
            : `${baseUrl}ctg-filter/`
        );
    };
    useEffect(() => {
        let isFetching = false;
        const handleScroll = () => {
            const scrollThresholdRatio = 0.8; // Adjust this ratio as needed
            const remainingDistance = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
            const scrollThreshold = window.innerHeight * scrollThresholdRatio;
            if (!isFetching && remainingDistance <= scrollThreshold) {
                if (nextPageUrl) {
                    isFetching = true;
                    fetchImages(nextPageUrl)
                        .then(() => {
                            isFetching = false;
                        })
                        .catch((error) => {
                            console.error('Error fetching next page:', error);
                            isFetching = false;
                        });
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextPageUrl]);



    const { data: Productsimaga } = useProductsImageQuery()
    // const handleCategoryClick = (category) => {
    //     setCategory(category);
    //     setCurrentPage(prevPage => {
    //         // Reset currentPage to 1 when a new category is selected
    //         // Use the functional form of setState to ensure correct value based on previous state
    //         return 1;
    //     });
    // };
    const handleScrollButtonClick = (direction) => {
        const slider = sliderRef.current;
        if (slider) {
            const scrollAmount = 600;
            if (direction === 'left') {
                slider.scrollTo({
                    left: slider.scrollLeft - scrollAmount,
                    behavior: 'smooth',
                });
            } else if (direction === 'right') {
                slider.scrollTo({
                    left: slider.scrollLeft + scrollAmount,
                    behavior: 'smooth',
                });
            }
        }
    };
    // Quary Search Api 
    // useEffect(() => {
    //     function imgCategoryData() {

    //         axios.get(`${baseUrl}search/?tags=${quary}`)
    //             .then((res) => {
    //                 setQueryImageApi(res.data)
    //             })
    //             .catch(() => {
    //                 setHato(" categoiesda hatolik bor")
    //             })
    //     }
    //     if (quary) imgCategoryData()
    // }, [quary]);
    const [loadingQuery, setLoadingQuery] = useState(false);
    const [queryImages, setQueryImages] = useState([]);
    const [nextPageUrl2, setNextPageUrl2] = useState('');
    // console.log(queryImages)
    useEffect(() => {
        // console.log("Fetching images for query:", quary);
        fetchImagesQuery(`${baseUrl}search/?tags=${quary}`);
    }, [quary]);
    
    // ...
    
    const fetchImagesQuery = (url) => {
        if (loadingQuery) return;
        setLoadingQuery(true);
    
        axios.get(url)
            .then(response => {
                const data = response.data;
    
                if (!nextPageUrl2) {
                    setQueryImages([]);
                }
    
                setQueryImages(prevImages => [...prevImages, ...data.results]);
                setNextPageUrl2(data.next || '');
                setLoadingQuery(false);
            })
            .catch(error => {
                // console.error('Error fetching images:', error);
                // console.error('Response data:', error.response.data);
                // console.error('Response status:', error.response.status);
                // console.error('Response headers:', error.response.headers);
                setLoadingQuery(false);
            });
    };
    
    


    useEffect(() => {
        fetchImagesQuery(`${baseUrl}search/?tags=${quary}`);
    }, [quary]);
    
    // ...
    
    useEffect(() => {
        let isFetching = false;
        const handleScroll = () => {
            const scrollThresholdRatio = 0.8;
            const remainingDistance = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
            const scrollThreshold = window.innerHeight * scrollThresholdRatio;
        
            if (!isFetching && remainingDistance <= scrollThreshold) {
                if (nextPageUrl2) {
                    isFetching = true;
                    fetchImagesQuery(nextPageUrl2)
                        .then(() => {
                            isFetching = false;
                        })
                        .catch((error) => {
                            console.error('Error fetching next page:', error);
                            isFetching = false;
                        });
                }
            }
        };
        
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextPageUrl2]);
    

    return (
        <div className='py-5'>
            <div
                onMouseEnter={() => setIconVisible(true)}
                onMouseLeave={() => setIconVisible(false)}
                className='flex flex-row gap-7 py-4 pr-20 pl-5 overflow-x-scroll hide-scroll w-full'
                ref={sliderRef}
            >
                <button
                    onClick={() => handleScrollButtonClick('left')}
                    className={`absolute bg-[#efefef85] hover:bg-[#00000030] ${iconVisible ? "" : "hidden"} rounded-full z-10 px-2 py-2 h-10 top-[634px] shadow shadow-gray-200 transition-all duration-300 left-6 border border-[#F0F0F8] text-[#adadad] hover:text-white active:scale-75 `}
                >
                    <MdNavigateBefore className='text-2xl' />
                </button>
                <button
                    onClick={() => handleScrollButtonClick('right')}
                    className={`absolute bg-[#efefef85] hover:bg-[#00000030] ${iconVisible ? "" : "hidden"} rounded-full z-10 px-2 py-2 h-10 top-[634px] shadow shadow-gray-200 transition-all duration-300 right-6 border border-[#F0F0F8] text-[#adadad] hover:text-white active:scale-75`}
                >
                    <MdNavigateNext className='text-2xl' />
                </button>

                <button onClick={() => handleCategoryClick('')} className='flex min-w-[200px] flex-row items-center justify-between p-[12px] h-[80px] rounded-[10px] border border-[#F0F0F8] bg-[#f0f0f850] hover:bg-slate-200 duration-300 outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'>
                    <div className='flex flex-col justify-between items-start h-full'>
                        <h1 className='text-xl font-medium text-[#727272] -mt-1.5'>All</h1>
                        <span className='text-sm text-[#adadad] -mb-2'>{Productsimaga?.result}+</span>
                    </div>
                    <img className='bg-cover w-[70px]' src={Ally} alt="" />
                </button>
                {isSuccessCategories && categories?.all_categ?.map((category, index) => (
                    <button onClick={() => handleCategoryClick(category.name)} className='flex min-w-[200px] max-w-[300px] flex-row items-center justify-between p-[12px] h-[80px] i rounded-[10px] border border-[#F0F0F8] bg-[#f0f0f850] hover:bg-slate-200 duration-300 outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform' key={index}>
                        <div className='flex flex-col justify-between items-start h-full'>
                            <h1 className='text-xl font-medium text-[#727272] -mt-1.5 text-start leading-5'>{category.name}</h1>
                            <span className='text-sm text-[#adadad] -mb-2'>{category.image_count}+</span>
                        </div>
                        <img className='bg-cover w-[70px]' src={`${imageUrl}${category.ctg_img}`} alt="hatoo" />
                    </button>
                ))}
            </div>

            <div className='px-16 py-5'>
                <div className='py-7'>
                    {loading && (
                        <div className='pl-[45%]'>
                            <TailSpin
                                visible={true}
                                height='100'
                                width='100'
                                color='#1fadff'
                                ariaLabel='Loading images...'
                                radius='1'
                                wrapperStyle={{}}
                                wrapperClass=''
                            />
                        </div>
                    )}

                    {
    quary ? (
        queryImages && queryImages.length > 0 ? (
            <div className='grid grid-cols-5 gap-5'>
                <ProductsImageCard productsImg={queryImages} />
            </div>
        ) : (
            <div className='flex flex-col gap-5 w-[100px]'>
                <img className='absolute w-[1000px] left-[23%]' src={SearchEmpty} alt="No images found" />
                <h1 className='absolute text-xl font-medium italic text-[#acacac] left-[44%]'>No Images Found</h1>
            </div>
        )
    ) : (
        images && images.length > 0 ? (
            <div className='grid grid-cols-5 gap-5'>
                <ProductsImageCard productsImg={images} />
            </div>
        ) : (
            <div className='flex flex-col gap-5 w-[100px]'>
                <img className='absolute w-[1000px] left-[23%]' src={SearchEmpty} alt="No images found" />
                <h1 className='absolute text-xl font-medium italic text-[#acacac] left-[44%]'>No Images Found</h1>
            </div>
        )
    )
}



                    {/* {(isSuccessFilteredCategories &&
                        (filteredCategoriesApi.length > 0 || filteredCategories?.results?.category_imgs.length > 0) ? (
                        // <div className='row'>
                        <div className='  grid grid-cols-5 gap-5'>
                            <ProductsImageCard productsImg={
                                isSuccessFilteredCategories ? filteredCategoriesApi : filteredCategories?.results?.category_imgs
                            } />
                        </div>
                        // </div>
                    ) : (
                        <div className='flex flex-col gap-5 w-[100px]'>
                            <img className='absolute w-[1000px] left-[23%]' src={SearchEmpty} alt="No images found" />
                            <h1 className='absolute text-xl font-medium italic text-[#acacac] left-[44%]'>No Images Found</h1>
                        </div>
                    )
                    )
                        // ||
                        // (isSuccessSearchedData &&
                        //     (
                        //         searchedData.length > 0) ? (
                        //     // <div className='row'>
                        //     <div className='  grid grid-cols-5 gap-5'>
                        //         <ProductsImageCard productsImg={
                        //             isSuccessFilteredCategories ? filteredCategoriesApi : []
                        //         } />
                        //     </div>
                        //     // </div>
                        // ) : (
                        //     <div className='flex flex-col gap-5 w-[100px]'>
                        //         <img className='absolute w-[1000px] left-[23%]' src={SearchEmpty} alt="No images found" />
                        //         <h1 className='absolute text-xl font-medium italic text-[#acacac] left-[44%]'>No Images Found</h1>
                        //     </div>
                        // )
                        // )
                    } */}
                </div>
            </div>
        </div>
    );
}

export default ProductsImage;
