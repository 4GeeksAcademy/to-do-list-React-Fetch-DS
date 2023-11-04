import React, { useState } from 'react';

const DeleteAll = ({ setTodos, deleteTodo, setUsername, setCardUsername, setBoolean, setTaskInput, setDeleteAll }) => {

    const handleDeleteBtn = () => {
        setDeleteAll(true);
        setTimeout(() => {
            deleteTodo();
            setDeleteAll(false);
            setBoolean(false);
            setTodos([]);
            setCardUsername(false);
            setTaskInput("");
            setUsername("");
        }, 2000);
    }

    return (
        <div className='container-btn-delete'>
            <button
                type='button'
                className='btn-delete-all'
                onClick={handleDeleteBtn}
            >
                Delete all tasks and username
            </button>
        </div>
    )
}

export default DeleteAll;