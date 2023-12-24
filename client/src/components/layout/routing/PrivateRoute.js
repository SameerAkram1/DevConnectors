import React, { Children } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/register" replace />;
    }

    return children;
}

export default PrivateRoute