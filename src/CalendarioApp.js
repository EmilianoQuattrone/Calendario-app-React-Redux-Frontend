import React from 'react';
import { Provider } from 'react-redux';
import { AppRoute } from './Routes/AppRoute';
import { store } from './store/store';

export const CalendarioApp = () => {

    return (

        <Provider store={store}>
            <AppRoute />
        </Provider>
    )
}