import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./eventos";

export const startLogin = (email, password) => {

    return async (dispatch) => {

        const respuesta = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await respuesta.json();

        //Esto ya es de mi backend
        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-date', new Date().getTime());

            dispatch(login({

                uid: body.uid,
                nombre: body.nombre
            }));

        } else {

            Swal.fire('Error', body.mensaje, 'error');
        }
    }
}

export const startRegister = (nombre, email, password) => {

    return async (dispatch) => {

        const respuesta = await fetchSinToken('auth/nuevo', { nombre, email, password }, 'POST');
        const body = await respuesta.json();

        console.log(body);

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-date', new Date().getTime());

            dispatch(login({

                uid: body.uid,
                nombre: body.nombre
            }));

        } else {

            Swal.fire('Error', body.mensaje, 'error');
        }
    }
}

export const startChecking = () => {

    return async (dispatch) => {

        const respuesta = await fetchConToken('auth/renew');
        const body = await respuesta.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-date', new Date().getTime());

            dispatch(login({

                uid: body.uid,
                nombre: body.nombre
            }));

        } else {

            Swal.fire('Error', body.mensaje, 'error');
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({

    type: types.authCheckingFinish
});

const login = (usuario) => ({

    type: types.authLogin,
    payload: usuario
});

export const logout = () => {

    return async (dispatch) => {

        localStorage.clear();

        dispatch(clearAuth());
        dispatch(eventLogout());
    }
}

const clearAuth = () => ({

    type: types.authLogout
});