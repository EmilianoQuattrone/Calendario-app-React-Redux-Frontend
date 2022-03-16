import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvento } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = (evento) => {

    return async (dispatch, getState) => {

        const { uid, nombre } = getState().auth;

        try {

            const respuesta = await fetchConToken('eventos', evento, 'POST');
            const body = await respuesta.json();

            if (body.ok) {

                evento.id = body.eventoGuardado.id;
                evento.user = {

                    _id: uid,
                    nombre: nombre
                }

                dispatch(eventoAdd(evento));

            }

        } catch (error) {

            console.log(error);
        }
    }
}

const eventoAdd = (evento) => ({

    type: types.eventAddNew,
    payload: evento
});

export const eventoSetActive = (evento) => ({

    type: types.eventSetActivo,
    payload: evento
});

export const limpiarNotaActiva = () => ({

    type: types.eventClearActiveNote
});

export const eventStartUpdate = (evento) => {

    return async (dispatch) => {

        try {

            const respuesta = await fetchConToken(`eventos/${evento.id}`, evento, 'PUT');
            const body = respuesta.json();

            if (body.ok) {

                dispatch(eventUpdate(evento));
                Swal.fire('Ok', body.emnsaje, 'success');

            } else {

                Swal.fire('Error', body.mensaje, 'error');
            }

        } catch (error) {

            console.log(error);
        }
    }
}

const eventUpdate = (evento) => ({

    type: types.eventUpdate,
    payload: evento
});

export const eventStartDelete = () => {

    return async (dispatch, getState) => {

        const { id } = getState().calendario.eventoActivo;
        try {

            const respuesta = await fetchConToken(`eventos/${id}`, {}, 'DELETE');
            const body = respuesta.json();

            if (body.ok) {

                dispatch(eventoEliminar());

            } else {

                Swal.fire('Error', body.mensaje, 'error');
            }

        } catch (error) {

            console.log(error);
        }
    }
}

const eventoEliminar = () => ({

    type: types.eventDelete,
});

export const eventStartLoading = () => {

    return async (dispatch) => {

        try {

            const respuesta = await fetchConToken('eventos');
            const body = await respuesta.json();

            const eventos = prepareEvento(body.evento);
            dispatch(eventLoaded(eventos));

        } catch (error) {

            console.log(error);
        }
    }
}

const eventLoaded = (eventos) => ({

    type: types.eventLoaded,
    payload: eventos
});

export const eventLogout = () => ({

    type: types.eventLogout
});