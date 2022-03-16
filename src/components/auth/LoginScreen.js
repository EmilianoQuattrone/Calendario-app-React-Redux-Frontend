import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../acciones/auth';
import { useForm } from '../hook/useForm';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [valueLogin, handleLoginInputChange] = useForm({

        email: 'emiliano@gmail.com',
        password: '123456'
    });

    const { email, password } = valueLogin;

    const [valueRegister, handleRegisterInputChange] = useForm({

        nombre: 'sandra',
        rEmail: 'sandra@gmail.com',
        password1: '123456',
        password2: '123456',
    });

    const { nombre, rEmail, password1, password2 } = valueRegister;

    const handleSubmit = (e) => {

        e.preventDefault();
        dispatch(startLogin(email, password));
    }

    const handleRegister = (e) => {

        e.preventDefault();

        if (password1 !== password2) {

            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }

        dispatch(startRegister(nombre, rEmail, password1));
    }

    return (

        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">

                    <h3>Ingreso</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                value={email}
                                name='email'
                                onChange={handleLoginInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                value={password}
                                onChange={handleLoginInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>

                    </form>
                </div>

                <div className="col-md-6 login-form-2">

                    <h3>Registro</h3>

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='nombre'
                                value={nombre}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password1'
                                value={password1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='password2'
                                value={password2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}