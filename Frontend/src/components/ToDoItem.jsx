import Separator from "./Separator.jsx";
import {getTodos} from "../services/todos.js";

const ToDoItem = ({
    id, 
    title, 
    description, 
    createdOn, 
    isCompleted,
    setTodos
  }) => {

  const formattedDate = new Date(createdOn + 'Z').toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const deleteTodos = async () => {
    try {
      console.log(id)
      const response = await fetch(`http://localhost:8081/api/Records/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error()
      }
      
      setTodos(await getTodos());
    } catch (error) {
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
      border: 'none',
      borderRadius: '10px',
      minWidth: '300px',
      width: 'auto',
      gap: '10px',
      maxWidth: '50vw',
    }}>
      <h3 style={{fontSize: '35px', color: 'lightgray', margin: 0}}>{title}</h3>
      <Separator />
      <p style={{
        fontSize: '22px', 
        color: 'lightgray',
        margin: 0,
        overflowWrap: 'break-word'
      }}>{description}</p>
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
        <span style={{
          width: '40px',
          height: '40px',
          border: '2px solid teal',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1C1C1C',
        }}>
        {isCompleted ? (
          // Галочка
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="cornflowerblue" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          // Крестик
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="cornflowerblue" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
        </span>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '30px',
        alignItems: 'center'
      }}>
        <button className="todo-form__button focusable" 
                style={{
                  width: '30%',
        }}>Изменить</button>
        <button type="button" onClick={deleteTodos} className="todo-form__delete-button focusable" 
                style={{
                  width: '30%',
        }}>Удалить</button>
      </div>
    </div>
  )
}

export default ToDoItem