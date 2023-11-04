import React, { useEffect, useState } from "react";
import InputName from "./InputName.jsx"
import DeleteAll from "./DeleteAll.jsx"

const TodoList = () => {

	/* ---- Variables para agregar y quitar todos, con su respectivo index ---- */

	const [todos, setTodos] = useState([]); // Arreglo de todas las tasks/todos
	const [taskInput, setTaskInput] = useState("");
	const [noteIndex, setNoteIndex] = useState(0);
	const [deleteAll, setDeleteAll] = useState(false);
	const [boolean, setBoolean] = useState(false);
	const [cardUsername, setCardUsername] = useState(false);

	/* ---- Variables para controlar usernames ---- */

	const [username, setUsername] = useState("");
	let usersURL = 'https://playground.4geeks.com/apis/fake/todos/user/';


	useEffect(() => {
		if (username !== '') {
			postData();
		}
	}, [username])


	const handleInputChange = (e) => {
		setTaskInput(e.target.value);
		console.log(taskInput);
	}

	const handleDeleteTask = (i) => {
		const newTodos = [...todos];
		newTodos.splice(i, 1);
		setTodos(newTodos);
		setNoteIndex(noteIndex - 1);
	}

	const handleAddTask = async (e) => {
		try {
			if (taskInput.trim() !== "") {
				let obj = {
					label: taskInput,
					done: false
				}
				setTodos([...todos, obj]);
				setBoolean(true);
				setTaskInput("");
				setNoteIndex(noteIndex + 1);

				const setPutData = await putData();
				console.log("Sending Data (handleAddTask)", setPutData);
			}
		} catch (error) {
			console.log(error);
		}
	}


	/* ---- // GET DATA // ---- */
	const getData = async () => {
		try {
			let usernameAPI = username;
			let urlAPI = usersURL + usernameAPI;

			const responseGET = await fetch(urlAPI, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (responseGET.ok) {
				const responseJSONget = await responseGET.json();
				const label = responseJSONget.map(labelResponse => labelResponse);
				setTodos(label);
				setBoolean(true);
			} else {
				throw new Error("Request failed GET DATA (else)");
			}

		} catch (error) {
			console.log("Request failed GET DATA (catch)", error);
		}
	}

	/* ---- // POST DATA [username] // ---- */
	const postData = async () => {
		try {
			let usernameAPI = username;
			let urlAPI = usersURL + usernameAPI;

			const responsePOST = await fetch(urlAPI, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			});

			if (responsePOST.ok) {
				const responseJSONpost = await responsePOST.json();
				console.log(responseJSONpost);
				console.log("New user created");
			} else if (username === username) {
				const responseJSONpost = await responsePOST.json();
				console.log(responseJSONpost);
				console.log("This user already exist");
				getData();
			} else {
				throw new Error("Request failed POST DATA (else)");
			}

		} catch (error) {
			console.log("Request failed POST DATA (catch)", error);
		}
	}

	/* ---- // PUT DATA [New list && add todo] // ---- */
	const putData = async () => {
		try {
			let usernameAPI = username;
			let urlAPI = usersURL + usernameAPI;
			const responsePUT = await fetch(urlAPI, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(todos)
			});

			if (responsePUT.ok) {
				const responseJSONput = responsePUT.json();
				console.log(responseJSONput);
				return responseJSONput.msg;
			} else {
				throw new Error("Request failed PUT DATA (else)")
			}

		} catch (error) {
			console.log("Request failed PUT DATA (catch)", error);
		}
	}

	/* ---- // DELETE DATA [tasks] // ---- */
	const deleteTodo = async () => {
		try {
			let usernameAPI = username;
			let urlAPI = usersURL + usernameAPI;
			const responseDEL = await fetch(urlAPI, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (responseDEL.ok) {
				const responseJSONdel = responseDEL.json();
				console.log(responseJSONdel);
			} else {
				throw new Error("Request failed DELETE DATA (else)")
			}

		} catch (error) {
			console.log("Request failed DELETE DATA (catch)", error);
		}
	}

	return (
		!deleteAll ? (
			!cardUsername ? (<InputName setCardUsername={setCardUsername} setUsername={setUsername} postData={postData} />) :
				(<>
					{/* Input para añadir notas y enviar su información */}
					<div className="container-input">
						<input className="input-To-Do" placeholder="What needs to be done?" type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
						<button className='btn-To-Do' onClick={handleAddTask}>Add Task</button>
					</div>

					{/* contenedor notas */}
					<div className="notes">
						{
							// Recorrer arreglo de todos para añadir tasks "independientes"
							todos.length > 0 &&
							todos.map((task, index) => {
								return (
									<div className="items">
										<div key={index} className='note'>{task.label}</div>
										<i
											class="item--right fa-regular fa-circle-xmark"
											onClick={() => handleDeleteTask(index)}
										></i>
									</div>
								)
							})
						}

						{todos.length > 0 && (
							<div className="delete-all-container">
								<DeleteAll deleteTodo={deleteTodo} setTodos={setTodos} setDeleteAll={setDeleteAll} setTaskInput={setTaskInput} setUsername={setUsername} setCardUsername={setCardUsername} setBoolean={setBoolean} />
							</div>
						)}

						{/* Contador de tasks */}
						<h6 className="note-index">{noteIndex} item left</h6>

					</div>
				</>)
		) : (
			<h1 className="delete-all-msg">Deleting tasks and user, patience!</h1>
		)
	)
}

export default TodoList;