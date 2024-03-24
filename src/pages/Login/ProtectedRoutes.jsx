import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminPage from '../AdminPage/AdminPage'
import { StateContext } from '../../App'
import AdminPageDanate from '../AdminPage/AdminPageDanate'

function ProtectedRoutes() {
    const {  role } = useContext(StateContext)
    return role === "Admin" ? (
        <>
            <Outlet />
        </>
    )
        : <Navigate to={"/login"} />
}

export default ProtectedRoutes
