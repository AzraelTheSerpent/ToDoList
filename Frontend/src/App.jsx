import './App.css'
import ToDoForm from "./components/ToDoForm.jsx";
import ToDoList from "./components/ToDoList.jsx";
import {useEffect, useState} from "react";
import {getTodos} from "./services/todos.js";

function App() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
    })
  }, []);
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "row"
    }}>
      <ToDoForm setTodos={setTodos} />
      <ToDoList todos={todos}/>
    </div>
  )
}

export default App
