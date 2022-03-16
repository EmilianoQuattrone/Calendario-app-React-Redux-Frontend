import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarModal } from '../../acciones/ui';
import { eventStartAddNew, eventStartUpdate, eventUpdate, limpiarNotaActiva } from '../../acciones/eventos';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const inicioFecha = moment().minute(0).second(0).add(1, 'hours');
const finFecha = inicioFecha.clone().add(2, 'hours');

// startAccessor="start" endAccessor = "end" tiene que llamarse iguak.
const eventoInicial = {

    title: '',
    notes: '',
    start: inicioFecha.toDate(),
    end: finFecha.toDate()
}

export const CalendarioModal = () => {

    // const [viewModal, setViewModal] = useState(true);

    const { openModal } = useSelector(state => state.ui);

    const { eventoActivo } = useSelector(state => state.calendario);

    const dispatch = useDispatch();

    //Para manejar la fecha actual.
    const [dateStart, setDateStart] = useState(inicioFecha.toDate());

    const [dateEnd, setDateEnd] = useState(finFecha.toDate());

    //State para capturar la informacion del formulario.
    const [values, setValue] = useState(eventoInicial);

    const { title, notes, start, end } = values;

    //Para cargar los componentes del modal.
    useEffect(() => {

        if (eventoActivo) {

            setValue(eventoActivo);
        } else {

            setValue(eventoInicial);
        }

    }, [eventoActivo, setValue]);


    const closeModal = () => {

        // setViewModal(false);
        dispatch(cerrarModal());
        dispatch(limpiarNotaActiva());
        setValue(eventoInicial);
    }

    const hancleStartDate = (e) => {

        setDateStart(e);
        setValue({

            ...values,
            start: e
        });
    }

    const hancleEndDate = (e) => {

        setDateEnd(e);
        setValue({

            ...values,
            end: e
        });
    }

    const handleInputChange = ({ target }) => {

        setValue({

            ...values,
            [target.name]: target.value
        });
    }

    const handleSave = (e) => {

        e.preventDefault();

        const momentInicioFecha = moment(start);
        const momentInicioFin = moment(end);

        if (momentInicioFecha.isSameOrAfter(momentInicioFin)) {

            return Swal.fire('Error', 'La fecha de finalizacion debe de ser mayor a la de inicio.', 'error')
        }

        if (title.trim().length < 2) {

            return Swal.fire('Error', `El campo titulo no debe de estar vacio`, 'error');
        }

        if (eventoActivo) {

            //Aquie estamos actualizando
            dispatch(eventStartUpdate(values));

        } else {

            //Aquie creamos un evento nuevo.
            dispatch(eventStartAddNew(values));
        }

        closeModal();
    }

    return (

        <Modal
            className="modal"
            overlayClassName="modal-fondo"
            isOpen={openModal}
            closeTimeoutMS={200}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <h1> {(eventoActivo) ? ('Editar evento') : ('Nuevo evento')} </h1>
            <hr />

            <form className="container" onSubmit={handleSave}>

                <div className="form-group">
                    <label>Fecha y hora inicio: </label>

                    <DateTimePicker onChange={hancleStartDate}
                        value={(eventoActivo) ? eventoActivo.start : dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin: </label>

                    <DateTimePicker onChange={hancleEndDate}
                        value={(eventoActivo) ? eventoActivo.end : dateEnd}
                        className="form-control"
                        minDate={dateStart}
                    />

                </div>

                <hr />

                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>

                    <small id="emailHelp" className="form-text text-muted"> Información adicional </small>

                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}