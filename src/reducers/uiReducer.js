import { types } from "../types/types";

const estadoInicial = {

    openModal: false
}

export const uiReducer = (state = estadoInicial, action) => {

    switch (action.type) {

        case types.uiOpenModal:

            return {

                ...state,
                openModal: true
            }

        case types.uiCloseModal:

            return {

                ...state,
                openModal: false
            }

        default:

            return state;
    }
}