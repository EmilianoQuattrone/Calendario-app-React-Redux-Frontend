import React from 'react';

export const CalendarioEvento = ({ event }) => {

    const { title, user } = event;

    return (

        <div>
            <strong>{title}</strong>
            <span>- {user.nombre}</span>
        </div>
    )
}