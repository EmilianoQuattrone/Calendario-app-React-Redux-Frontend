import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendario-es';
import { CalendarioEvento } from './CalendarioEvento';
import { CalendarioModal } from './CalendarioModal';
import { useDispatch, useSelector } from 'react-redux';
import { abrirModal } from '../../acciones/ui';
import { eventoSetActive, eventStartLoading, limpiarNotaActiva } from '../../acciones/eventos';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarioScreen = () => {

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);

    const { eventos, eventoActivo } = useSelector(state => state.calendario);

    const [view, setView] = useState(localStorage.getItem('View') || 'month');

    const eventoEstilo = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);

        const style = {

            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {

            style
        }
    }

    useEffect(() => {

        dispatch(eventStartLoading());

    }, [dispatch]);


    const dounbleClick = (e) => {

        // console.log(e);
        dispatch(abrirModal());
    }

    const onSelect = (e) => {

        dispatch(eventoSetActive(e));
    }

    const onSelectSlot = (e) => {

        dispatch(limpiarNotaActiva());
    }

    const onView = (e) => {

        setView(localStorage.setItem('View', e));
    }

    return (

        <div className='calendario-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventoEstilo}
                onDoubleClickEvent={dounbleClick}
                onSelectEvent={onSelect}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onView}
                view={view}
                components={{
                    event: CalendarioEvento
                }}
                style={{ height: 500 }}
            />

            <AddNewFab />

            {
                (eventoActivo) && <DeleteEventFab />
            }

            <CalendarioModal />
        </div>
    )
}