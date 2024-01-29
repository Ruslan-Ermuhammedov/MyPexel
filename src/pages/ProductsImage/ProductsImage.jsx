import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { baseUrl, } from '../../constants/baseUrl';
import ProductsImageCard from './components/ProductsImageCard';
import { StateContext } from '../../App';
import { ImageAPiInitialState, ImageAPiReducer } from '../../reducer/ImagesApiReducer/ImagesAPiReducer';
import { TailSpin } from 'react-loader-spinner'
function ProductsImage() {
    const { categoriesImg, setCategoriesImg, productsImg, setProductsImg, quary } = useContext(StateContext)
    const [Category, setCategory] = useState("All Categories")
    const [queryImageApi, setQueryImageApi] = useState([])
    const [state, dispatch] = useReducer(ImageAPiReducer, ImageAPiInitialState)
    // ?tags=nimadir
    const [Hato,setHato]=useState()
    const handleCategoryClick = (category) => {
        setCategory(category)
    }
    const filter = productsImg.filter((item) => item.categories === Category)


    useEffect(() => {
        function imgData() {
            dispatch({ type: "LOADING" })
            axios.get(`${baseUrl}main/`)
                .then((res) => {
                    dispatch({ type: "SUCCESS", payload: res.data.result })
                    setProductsImg(res.data?.result)
                }
                )
                .catch(() => {
                    dispatch({ type: "REJECTED", payload: "Qandatdur hatolik bor" })
                    setHato("hatolik bor")
                }
                )
        }
        imgData()
    }, []);
    useEffect(() => {
        function imgCategoryData() {
            dispatch({ type: "LOADING" })

            axios.get(`${baseUrl}categories/`)
                .then((res) => {
                    dispatch({ type: "SUCCESS", payload: res.data.result })
                    setCategoriesImg(res.data?.all_categ)
                }
                )
                .catch(() => {
                    dispatch({ type: "REJECTED", payload: "Qandatdur hatolik bor" })

                    setHato(" categoiesda hatolik bor")
                })
        }
        imgCategoryData()
    }, []);

    useEffect(() => {
        function imgCategoryData() {
            dispatch({ type: "LOADING" })

            axios.get(`${baseUrl}search/?tags=${quary}`)
                .then((res) => {
                    dispatch({ type: "SUCCESS", payload: res.data.result })
                    setQueryImageApi(res.data)
                })
                .catch(() => {
                    dispatch({ type: "REJECTED", payload: "Qandatdur hatolik bor" })
                   setHato(" categoiesda hatolik bor")
                })
        }
        imgCategoryData()
    }, [quary]);

    return (
        <div className='px-16 py-5   '>
            <div className='flex  flex-row gap-7 py-10 overflow-x-auto hide-scroll'>
                <button onClick={() => handleCategoryClick('All Categories')} className='inline-flex px-[25px] h-[45px] items-center justify-center rounded-[10px] border border-[#F0F0F8] bg-[#f0f0f850] text-xl font-medium text-[#6D71F9] hover:bg-slate-200  duration-300 w-full  outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform'>
                    All
                </button>
                {categoriesImg.map((category, index) => (
                    <button onClick={() => handleCategoryClick(category.name)} className='inline-flex px-[25px] h-[35px] items-center justify-center rounded-[10px] border border-[#F0F0F8] bg-[#f0f0f850] text-xl font-medium text-[#6D71F9] hover:bg-slate-200  w-auto  outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform ' key={index}>
                        {category.name}
                    </button>
                ))}
            </div>


            <div className='py-7'>
                {state.isLoading && <h1>   <button className=' pl-[45%]'>

                    <TailSpin
                        visible={true}
                        height="100"
                        width="100"
                        color="#1fadff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </button>
                </h1>}
                {state.rejected && <h1>{state.rejected}</h1>}
                {state.isSuccess &&
                    <ProductsImageCard productsImg={
                        quary ? queryImageApi
                            : Category === "All Categories" ? productsImg
                                : filter
                    } />}
            </div>
        </div>
    )
}

export default ProductsImage
