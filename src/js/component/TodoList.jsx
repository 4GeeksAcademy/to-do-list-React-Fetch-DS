import React, { useState } from "react";
import InputName from "./inputName"
import DeleteAll from "./DeleteAll"

const TodoList = () => {

	/* ---- Variables para agregar y quitar todos, con su respectivo index ---- */

	const [todos, setTodos] = useState([]); // Arreglo de todas las tasks/todos
	const [task, setTask] = useState(""); // Tarea que se inyecta en el HTML
	const [noteIndex, setNoteIndex] = useState(0);

	/* ---- Variables para controlar usernames ---- */

	const [username, setUsername] = useState("");
	const [usernameInput, setUsernameInput] = useState("");
	let usersURL = 'https://playground.4geeks.com/apis/fake/todos/user/';

	/* ---- // GET DATA // ---- */
	const getData = () => {

	}

	/* ---- // POST DATA [username] // ---- */
	const postData = () => {

	}

	/* ---- // PUT DATA [New list && add todo] // ---- */
	const putData = () => {

	}

	/* ---- // DELETE DATA [tasks] // ---- */
	const deleteTodo = () => {

	}

	return (
		<>
			{/* Input para añadir notas y enviar su información */}
			<div className="container-input">
				<input className="input-To-Do" placeholder="What needs to be done?" type="text" value={task} onChange={(e) => setTask(e.target.value)} />
				<button className='btn-To-Do' onClick={addTodos}>Add Task</button>
			</div>

			{/* contenedor notas */}
			<div className="notes">
				{
					// Recorrer arreglo de todos para añadir tasks "independientes"
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

				{/* Contador de tasks */}
				<h6 className="note-index">{noteIndex} item left</h6>

			</div>
		</>
	)
}

export default TodoList;