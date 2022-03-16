import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { startChecking } from '../acciones/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarioScreen } from '../components/calendario/CalendarioScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRoute = () => {

    const dispatch = useDispatch();

    const { checking } = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startChecking());

    }, [dispatch]);

    return (

        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={

                        <PublicRoute>

                            <LoginScreen />
                        </PublicRoute>
                    } />

                    <Route path='/' element={

                        <PrivateRoute>
                            <CalendarioScreen />
                        </PrivateRoute>
                    } />

                    <Route path='*' element={<Navigate replace to='/login' />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}