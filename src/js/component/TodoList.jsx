import React, { useEffect, useState } from "react";
import InputName from "./InputUsername.jsx";
import DeleteAll from "./DeleteAll.jsx";
import Swal from 'sweetalert2'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [noteIndex, setNoteIndex] = useState(0);
  const [deleteAll, setDeleteAll] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const [cardUsername, setCardUsername] = useState(false);
  const [username, setUsername] = useState("");
  const usersURL = 'https://playground.4geeks.com/apis/fake/todos/user/';

  useEffect(() => {
    if (username !== "") {
      postData();
    }
  }, [username]);

  useEffect(() => {
    if (boolean) {
      putData();
    }
  }, [boolean, todos]);

  const handleDeleteTask = (i) => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
    setNoteIndex(newTodos.length);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const obj = {
        label: taskInput,
        done: false
      };
      setTodos([...todos, obj]);
      setBoolean(true);
      setTaskInput("");
      setNoteIndex(todos.length + 1);
    }
  };

  const getData = async () => {
    try {
      const usernameAPI = username;
      const urlAPI = usersURL + usernameAPI;

      const responseGET = await fetch(urlAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (responseGET.ok) {
        const responseJSONget = await responseGET.json();
        console.log("Data fetched:", responseJSONget);
        setTodos(responseJSONget);
        setBoolean(true);
      } else {
        throw new Error("Request failed GET DATA (else)");
      }
    } catch (error) {
      console.log("Request failed GET DATA (catch)", error);
    }
  };

  const postData = async () => {
    try {
      const usernameAPI = username;
      const urlAPI = usersURL + usernameAPI;

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
        Swal.fire({
          icon: "success",
          title: "New user created",
          showConfirmButton: false,
          timer: 1500
        });
        getData(); // Move getData() here to fetch data after user creation
      } else if (username === username) {
        const responseJSONpost = await responsePOST.json();
        console.log(responseJSONpost);
        Swal.fire({
          icon: "success",
          title: "User already exist, obtaining data",
          showConfirmButton: false,
          timer: 1500
        });
        getData(); // Move getData() here to fetch data if user already exists
      } else {
        throw new Error("Request failed POST DATA (else)");
      }
    } catch (error) {
      console.log("Request failed POST DATA (catch)", error);
    }
  };

  const putData = async () => {
    try {
      const usernameAPI = username;
      const urlAPI = usersURL + usernameAPI;
      const responsePUT = await fetch(urlAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todos)
      });

      if (responsePUT.ok) {
        const responseJSONput = await responsePUT.json();
        console.log(responseJSONput);
      } else {
        throw new Error("Request failed PUT DATA (else)");
      }
    } catch (error) {
      console.log("Request failed PUT DATA (catch)", error);
    }
  };

  /* ---- // DELETE DATA [tasks] // ---- */
  const deleteUser = async () => {
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
      !cardUsername ? (
        <InputName
          setCardUsername={setCardUsername}
          setUsername={setUsername}
          postData={postData}
        />
      ) : (
        <>
          <div className="container-input">
            <input
              className="input-To-Do"
              placeholder="What needs to be done?"
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button className="btn-To-Do" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
          <div className="notes">
            {todos.length > 0 &&
              todos.map((task, index) => (
                <div className="items" key={index}>
                  <div className="note">{task.label}</div>
                  <i
                    className="item--right fa-regular fa-circle-xmark"
                    onClick={() => handleDeleteTask(index)}
                  ></i>
                </div>
              ))}
            {todos.length > 0 && (
              <div className="delete-all-container">
                <DeleteAll
                  deleteUser={deleteUser}
                  setTodos={setTodos}
                  setDeleteAll={setDeleteAll}
                  setTaskInput={setTaskInput}
                  setUsername={setUsername}
                  setCardUsername={setCardUsername}
                  setBoolean={setBoolean}
                />
              </div>
            )}
            <h6 className="note-index">{noteIndex} item left</h6>
          </div>
        </>
      )
    ) : (
      <h1 className="delete-all-msg">Deleting tasks and user, patience!</h1>
    )
  );
};

export default TodoList;
