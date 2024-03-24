import React, { useContext, useEffect } from 'react'
import Sidebar from '../../loyaut/Sidebar/Sidebar'
import Header from '../../loyaut/Header/Header'
import PageContent from '../../loyaut/PageContent/PageContent'
import { StateContext } from '../../App'

function AdminPageDanate() {
    const {setUrl}=useContext(StateContext)
    const currentPageUrl = window.location.href;
    useEffect(()=>{

        setUrl( currentPageUrl)
    },[currentPageUrl])
    return (
        <div className={` flex items-start flex-row`} >
            <Sidebar />
            <div className="min-h-screen w-fit flex-1 flex flex-col items-start ">
                <Header />
                <PageContent />
            </div>
        </div>
    )
}

export default AdminPageDanate
