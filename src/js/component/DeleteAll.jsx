import React, { useState } from 'react';

const DeleteAll = () => {

    const handleDeleteBtn = () => {

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