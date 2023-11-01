import React, { useState } from "react";

const TodoList = () => {

	// Variables para agregar y quitar todos, con su respectivo index
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("")
	const [noteIndex, setNoteIndex] = useState(0);

	// Variables para controlar usernames
	const [username, setUsername] = useState("");

	const addTodos = () => {
		const newTodos = [...todos]
		if (task === "") {
			return;
		} else {
			newTodos.push(task)
			setTodos(newTodos)
			setTask("")
			setNoteIndex(noteIndex + 1)
		}
	}

	const deleteTodos = (index) => {
		const newTodos = [...todos]
		newTodos.splice(index, 1)
		setTodos(newTodos)
		setNoteIndex(noteIndex - 1)

	}

	return (
		<>
			{/* Input para añadir notas */}

			<div className="container-input">
				<input className="input-To-Do" placeholder="What needs to be done?" type="text" value={task} onChange={(e) => setTask(e.target.value)} />
				<button className='btn-To-Do' onClick={addTodos}>Add Task</button>
			</div>

			{/* contenedor notas */}
			<div className="notes">
				{
					// notas
					todos.length > 0 &&
					todos.map((task, index) => {
						return (
							<div className="items">
								<div key={index} className='note'>{task}</div>
								<i
									class="item--right fa-regular fa-circle-xmark"
									onClick={() => deleteTodos(index)}
								></i>
							</div>
						)
					})

				}
				<h6 className="note-index">{noteIndex} item left</h6>

			</div>
		</>
	)
}

export default TodoList;