import React, { useState } from 'react';
import {getTodos} from "../services/todos.js";

const AddToDoForm = ({setTodos}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8081/api/Records/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      setError(false);
      console.log('Success:', response);
      setTitle('');
      setDescription('');
      setTodos(await getTodos());
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="todo-form"
        style={{ border: error ? '2px dashed #dc3545' : 'none' }}
      >
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          placeholder="Название"
          className="todo-form__input focusable"  
        />
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          placeholder="Описание"
          className="todo-form__textarea focusable"
        />
        <button
          type="submit"
          className="todo-form__button focusable"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddToDoForm;