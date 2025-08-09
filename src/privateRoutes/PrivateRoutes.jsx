import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';
import Loading from '../components/Loading';

const PrivateRoutes = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();
    if(loading){
        return <Loading/>
    }
    if(!user){
        return <Navigate to="/auth/login" state={location.pathname}/>
    }
    return children
};

export default PrivateRoutes;