import React, { use } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext/AuthContext';
import Loading from '../components/Loading';



const HomeLayout = () => {
    const {loading} = use(AuthContext)
    
    if(loading){
        return(
            <div className="flex justify-center items-center py-20">
                <Loading/>
            </div>
        )
    }

    return (
        <div className='overflow-x-hidden overflow-y-hidden'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default HomeLayout;