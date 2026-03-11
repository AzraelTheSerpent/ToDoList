import ToDoItem from "./ToDoItem.jsx";

const ToDoList = ({todos, setTodos}) => {
  
  return (
    <section style={{ 
      padding: 0,
      background: 'transparent',
      border: 'none',
      marginTop: '20px',
      marginLeft: 'auto',
      width: 'auto',
      marginRight: '20px',
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '50px',
        margin: 0,
        padding: 0,
      }}>
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