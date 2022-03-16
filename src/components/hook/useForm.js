import { useState } from "react";

export const useForm = (estadoInicial = {}) => {

    const [value, setValue] = useState(estadoInicial);

    const handleInputChange = ({ target }) => {

        setValue({

            ...value,
            [target.name]: target.value
        });
    }

    return [value, handleInputChange];
}