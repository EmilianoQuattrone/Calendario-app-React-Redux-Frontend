import { types } from "../types/types";

export const abrirModal = () => ({

    type: types.uiOpenModal
});

export const cerrarModal = () => ({

    type: types.uiCloseModal
});