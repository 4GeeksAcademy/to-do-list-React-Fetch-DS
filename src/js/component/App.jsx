import React, { useState } from "react";
import TodoList from "./TodoList";
import InputUsername from "./InputName";
import DeleteAll from "./DeleteAll";

const App = () => {

    return (
        <div className="to-do-container">
            <h1 className="title">To-do List</h1>
            <InputUsername />
            <div className="to-do letter">
                {/* Notes To-do */}
                <TodoList />
            </div>
            <DeleteAll />
        </div>
    );
};

export default App;