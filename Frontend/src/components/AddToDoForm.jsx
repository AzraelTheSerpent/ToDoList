import React, { useState } from 'react';

const AddToDoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/api/Records/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description}),
    }).then(r => {console.log(r)}); 
    
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="todo-add-form"
      >
        <div>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Название"
            style={{ 
              fontSize: '16px',
              fontStyle: 'normal',
              width: '100%', 
              padding: '8px', 
              boxSizing: 'border-box', 
              border: '0',
              borderRadius: '10px',
          }}/>
        </div>
  
        <div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Описание"
            style={{
              minHeight: '200px',
              width: '100%',
              fontSize: '16px',
              fontStyle: 'normal',
              padding: '8px',
              boxSizing: 'border-box',
              border: '0',
              borderRadius: '10px 10px 0 10px',
              resize: 'vertical', // позволяет менять высоту
            }}/>
        </div>
  
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
            alignSelf: 'center',
            width: '80%',
            backgroundColor: 'teal',
            borderRadius: '10px',
            border: '0',
            fontWeight: 'bold',
            fontSize: '22px',
          }}
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddToDoForm;