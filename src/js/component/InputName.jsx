import React, { useState } from 'react';

const InputUsername = ({ serUsername }) => {

    const [value, setValue] = useState("");

    /* ---- Capturar el valor del input ---- */
    const handleInputChange = (e) => {
        setValue(e.target.value);
        console.log(value)
    }

    /* ---- Enviar los datos al hacer click en el btn ---- */
    const handleClickBtn = () => {
        try {
            // Enviar datos del username 

        } catch (error) {
            console.log("Hubo un error", error);
        }
    }

    return (
        <div className='container-username'>

            <input
                className='input-username'
                type="text"
                placeholder='Username'
                value={value}
                onChange={handleInputChange}
            />

            <button
                className='submit-username'
                type="button"
                onClick={handleClickBtn}
            >Submit</button>

        </div>
    )
}

export default InputUsername;