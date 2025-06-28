import { useAuth } from "../context/AuthProvider";
import React from 'react'
import { Navigate,Outlet } from "react-router-dom";


const protectedLayout:React.FC = () => {

    const {user,loading}=useAuth()
    if(loading) return 

if(!user)        return user?<Outlet/>:<Navigate to='signin'/>

return <Outlet/>
}

export default protectedLayout