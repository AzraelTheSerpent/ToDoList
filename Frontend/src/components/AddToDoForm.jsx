import React, { useState } from 'react';

const AddToDoForm = () => {
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
      
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="todo-add-form"
        style={{ border: error ? '2px dashed #dc3545' : 'none' }}
      >
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          placeholder="Название"
          className="todo-add-form__input-title todo-add-form__focusable"  
        />
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          placeholder="Описание"
          className="todo-add-form__input-description todo-add-form__focusable"
        />
        <button
          type="submit"
          className="todo-add-form__button todo-add-form__focusable"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddToDoForm;