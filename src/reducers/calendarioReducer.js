import { types } from "../types/types";
/*
{

        id: 'abc-123'),
        title: 'Cumpleaños',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar torta',
        user: {

            _id: '123-abc',
            nombre: 'Emiliano'
        }
    }
*/
const estadoInicial = {

    eventos: [],
    eventoActivo: null
}

export const calendarioReducer = (state = estadoInicial, action) => {

    switch (action.type) {

        case types.eventSetActivo:

            return {

                ...state,
                eventoActivo: action.payload
            }

        case types.eventAddNew:

            return {

                ...state,
                eventos: [

                    ...state.eventos,
                    action.payload
                ]
            }

        case types.eventClearActiveNote:

            return {

                ...state,
                eventoActivo: null
            }

        case types.eventUpdate:

            return {

                ...state,
                eventos: state.eventos.map(
                    evento => (evento.id === action.payload.id) ? action.payload : evento)
            }

        case types.eventDelete:

            return {

                ...state,
                eventos: state.eventos.filter(
                    evento => (evento.id !== state.eventoActivo.id)),
                eventoActivo: null
            }

        case types.eventLoaded:

            return {

                ...state,
                eventos: [...action.payload]
            }

        case types.eventLogout:

            return {

                ...estadoInicial
            }

        default:
            return state;
    }
}