import Separator from "./Separator.jsx";
import {getTodos} from "../services/todos.js";
import React, {useState} from "react";
import CheckBox from "./CheckBox.jsx";

const ToDoItem = ({
    id, 
    title, 
    description, 
    createdOn, 
    isCompleted,
    setTodos,
  }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newIsCompleted, setNewIsCompleted] = useState(isCompleted);
  const [editTodoMode, setEditTodoMode] = useState(false);
  const [error, setError] = useState(false);
  const formattedDate = new Date(createdOn + 'Z').toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const editTodo = async () => {
    try {
      const response = await fetch(`http://localhost/api/Records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: newTitle, description: newDescription, isCompleted: newIsCompleted}),
      })
      
      if (!response.ok) {
        setError(true);
        throw new Error("Failed to edit record");
      }
      setError(false);
      setTodos(await getTodos());
      setEditTodoMode(false)
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost/api/Records/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      setError(false);
      setTodos(await getTodos());
    } catch (error) {
      setError(true);
      console.error(error)
    }
    
  }

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      backgroundColor: '#1C1C1C',
      boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      minWidth: '350px',
      width: 'auto',
      gap: '10px',
      maxWidth: '50vw',
      border: error ? '2px dashed #dc3545' : 'none'
    }}>
      {editTodoMode ? <input
        type="text"
        id="title"
        defaultValue={title}
        onChange={(event) => setNewTitle(event.target.value)}
        required
        placeholder="Название"
        className="todo-form__input focusable"
      /> : <h3 
        style={{fontSize: '35px', color: 'lightgray', margin: 0, overflowWarp: 'break-word'}}
      >{title}</h3>}
      <Separator />
      {editTodoMode ? <textarea
        id="description"
        defaultValue={description}
        onChange={(event) => setNewDescription(event.target.value)}
        required
        placeholder="Описание"
        className="todo-form__textarea focusable"
      /> : <p style={{
        fontSize: '22px', 
        color: 'lightgray',
        margin: 0,
        overflowWrap: 'break-word'
      }}>{newDescription}</p>}
      <Separator />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          color: 'lightgray',
          fontSize: '25px',
        }}>{formattedDate}</span>
        {editTodoMode ? (<CheckBox isCompleted={newIsCompleted} onClick={() => {
          setNewIsCompleted(!newIsCompleted)
        }}/>) 
          : (<CheckBox isCompleted={isCompleted}/>)}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '30px',
        alignItems: 'center'
      }}>
        {editTodoMode ? 
          <button type="button"
                  onClick={editTodo}
                  className="todo-form__button focusable"
                  style={{
                    width: '30%',
                  }}>Готово
          </button> :
          <button type="button" 
                  onClick={() => {setEditTodoMode(true)}}
                  className="todo-form__button focusable" 
                  style={{
                   width: '30%',
                  }}>Изменить
          </button>}
        <button type="button" onClick={deleteTodo} className="todo-form__delete-button focusable" 
                style={{
                  width: '30%',
        }}>Удалить</button>
      </div>
    </div>
  )
}

export default ToDoItem