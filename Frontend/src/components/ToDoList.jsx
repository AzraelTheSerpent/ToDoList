import ToDoItem from "./ToDoItem.jsx";

const ToDoList = ({todos, setTodos}) => {
  
  return (
    <section style={{ 
      padding: '8px',
      background: 'transparent',
      border: 'none',
      // marginTop: '20px',
      width: 'auto',
      // marginRight: '20px',
    }}>
      <ul className="todo-list-container">
        {todos.map((todo) => (
          <li key={todo.id}>
            <ToDoItem
              id={todo.id}
              title={todo.title}
              description={todo.description}
              createdOn={todo.createdOn}
              isCompleted={todo.isCompleted}
              setTodos={setTodos}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ToDoList