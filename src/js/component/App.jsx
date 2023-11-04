import React, { useState } from "react";
import TodoList from "./TodoList";
import DeleteAll from "./DeleteAll";

const App = () => {

    return (
        <div className="to-do-container">
            <h1 className="title">To-do List</h1>
            <div className="to-do letter">
                {/* Notes To-do */}
                <TodoList />
            </div>
        </div>
    );
};

export default App;