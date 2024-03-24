import React, { useContext, useEffect, useState } from 'react'
import { useSearchedItemQuery } from '../../services/productsImageApi';
import { StateContext } from '../../App';
import ProductsImageCard from '../ProductsImage/components/ProductsImageCard';
import { imageUrl } from '../../constants/baseUrl';

function Tekshiruv() {
    const { quary } = useContext(StateContext)
    const [page, setPage] = useState(1);
    const { data: searchedData, isSuccess: isSuccessSearchedData, isLoading: isLoadingSearched, refetch } = useSearchedItemQuery({ quary, page });

    useEffect(() => {
        // Handle data fetching or dispatching to store if needed
    }, [searchedData]);

    const handleScroll = () => {
        if (!isLoadingSearched && isSuccessSearchedData && searchedData.next_page_exists) {
            const nextPage = page + 1;
            setPage(nextPage);
            refetch({ quary, page: nextPage });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [searchedData, isLoadingSearched]);
    console.log(searchedData)
    return (
        <div>
            {
                quary && (
                    <div className='grid grid-cols-5 gap-5'>
                        {
                            searchedData?.results.map((image) =>
                                <div className=' w-full'>
                                    <img className='w-full' src={`${imageUrl}${image.image}`} alt="" />
                                </div>
                            )

                        }
                    </div>
                )
            }
        </div>
    )
}

export default Tekshiruv
