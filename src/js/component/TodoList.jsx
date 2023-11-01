import React, { useEffect, useState } from "react";

const TodoList = () => {

	const [todos, setTodos] = useState([]);
	const [userTodos, setUserTodos] = useState([]);
	const [task, setTask] = useState("");
	const [noteIndex, setNoteIndex] = useState(0);

	let usersURL = 'https://playground.4geeks.com/apis/fake/todos/user/jaac';

	useEffect(() => {
		const fetchTodos = async () => {
			const res = await fetch(usersURL);
			const data = await res.json();
			setTodos(data);
		}

		fetchTodos();
	}, [])

	/* GET USER FROM API */
	const getUser = async () => {
		try {
			let response = await fetch(usersURL);
			let data = await response.json();

			if (response.ok) {
				setUserTodos(data);
			} else {
				await createUser();
			}

		} catch (error) {
			console.log(error);
		}
	}

	/* CREATE USER IN API */
	const createUser = async () => {
		try {
			let response = await fetch(usersURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify([]),
			});

			let data = await response.json();
			setUserTodos(data);

		} catch (error) {
			console.log(error);
		}
	}

	/* UPDATE USER TODOS IN API */
	const updateUserTodos = async (todos) => {
		try {
			let response = await fetch(usersURL, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(todos),
			});

			if (response.ok) {
				setUserTodos(todos);
			}

		} catch (error) {
			console.log(error);
		}
	}

	/* DELETE USER AND TODOS FROM API */
	const deleteUser = async () => {
		try {
			let response = await fetch(usersURL, {
				method: 'DELETE'
			});

			if (response.ok) {
				setUserTodos([]);
			}

		} catch (error) {
			console.log(error);
		}
	}

	/* ADD TODO */
	const addTodo = () => {
		const newTodos = [...userTodos, task];
		setUserTodos(newTodos);
		setTask("");
		setNoteIndex(noteIndex + 1);
		updateUserTodos(newTodos);
	}

	/* DELETE TODO */
	const deleteTodo = (index) => {
		const newTodos = userTodos.filter((_, i) => i !== index);
		setUserTodos(newTodos);
		setNoteIndex(noteIndex - 1);
		updateUserTodos(newTodos);
	}

	return (
		<>
			{/* Input para añadir notas */}

			<div className="container-input">
				<input
					className="input-To-Do"
					placeholder="What needs to be done?"
					type="text"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button
					className='btn-To-Do'
					onClick={addTodo}>
					Add Task
				</button>
			</div>

			{/* contenedor notas */}
			<div className="notes">
				{
					// notas
					userTodos.map((task, index) => {
						return (
							<div className="items" key={index}>
								<div className='note'>{task}</div>
								<i
									className="fa-regular fa-circle-xmark"
									onClick={() => deleteTodo(index)}
								/>
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