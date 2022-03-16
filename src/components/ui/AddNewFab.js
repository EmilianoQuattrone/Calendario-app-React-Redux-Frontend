import React from 'react';
import { useDispatch } from 'react-redux';
import { abrirModal } from '../../acciones/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleModal = () => {

        dispatch(abrirModal());
    }

    return (

        <button className='btn btn-primary fab' onClick={handleModal}>

            <i className='fas fa-plus'></i>
        </button>
    )
}