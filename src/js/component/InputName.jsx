import React, { useState } from 'react';

const InputUsername = () => {

    const [value, setValue] = useState("");

    const handleInputChange = (e) => {
        setValue(e.target.value);
        console.log(value)
    }

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
                type="submit"
                onClick={handleClickBtn}
            >Submit</button>

        </div>
    )
}

export default InputUsername;