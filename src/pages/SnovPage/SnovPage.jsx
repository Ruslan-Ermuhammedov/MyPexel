import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../App';
import { useSearchedItemQuery } from '../../services/productsImageApi';

function SnovPage() {
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
    
        </div>
    )
}


export default SnovPage
