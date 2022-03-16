import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../acciones/eventos';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDeleteEvento = () => {

        dispatch(eventStartDelete());
    }

    return (

        <button className='btn btn-danger fab-danger' onClick={handleDeleteEvento}>

            <i className='fas fa-trash'></i>
            <span> Boora evento </span>
        </button>
    )
}