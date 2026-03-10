import './App.css'
import ToDoForm from "./components/ToDoForm.jsx";
import ToDoList from "./components/ToDoList.jsx";
import {useEffect, useState} from "react";

function App() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/Records',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const data = await response.json();

      if (data.records && Array.isArray(data.records)) {
        return data.records;
      } else {
        console.warn('Сервер вернул данные без поля records или records не массив:', data);
        return [];
      }
    } catch (e) {
      console.error(e)
      return [];
    }
  }
  useEffect(() => {
    fetchTodos().then(data => {
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.warn('Сервер вернул не массив:', data);
        setTodos([]);
      }
    })
  }, []);
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "row"
    }}>
      <ToDoForm />
      <ToDoList todos={todos}/>
    </div>
  )
}

export default App
