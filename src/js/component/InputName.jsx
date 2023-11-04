import React, { useState } from 'react';

const InputUsername = ({ setUsername, setCardUsername, postData }) => {

    const [value, setValue] = useState("");

    /* ---- Capturar el valor del input ---- */
    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    /* ---- Enviar los datos al hacer click en el btn ---- */
    const handleClickBtn = async () => {
        try {
            if (value !== '') {
                try {
                    setCardUsername(true);
                    setUsername(value);
                    const sendPost = await postData();
                    console.log("Sending Data", sendPost);
                } catch (error) {
                    console.log("Hubo un error (InputNameClickBtn)", error)
                }

            } else {
                alert("Invalid username")
            }

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