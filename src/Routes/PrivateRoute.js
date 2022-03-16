import React from 'react';
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {

    const { auth } = useSelector((state) => state);

    return auth.uid ? children : <Navigate to="/auth/login" />;
}