import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const PublicRoute = ({ children }) => {

    const { auth } = useSelector((state) => state);

    return auth.uid ? <Navigate to="/" /> : children;
}
