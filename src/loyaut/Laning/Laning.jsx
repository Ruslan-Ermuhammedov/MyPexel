import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LaningImg from '../../assets/images/Laning.png'
import { StateContext } from '../../App'
function Laning() {
    const { url2, url } = useContext(StateContext)
    const currentPageUrl = window.location.href;
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={` rounded-3xl  fixed bottom-5 right-[14px] ${scrollPosition > 250 ? '' : 'hidden'}  ${url !== currentPageUrl ? "" : "hidden"} `}>

            <a href="#">
                <img className=' w-10 h-10  shadow-md shadow-zinc-300' src={LaningImg} alt="hato" />
            </a>
        </div>
    )
}

export default Laning
