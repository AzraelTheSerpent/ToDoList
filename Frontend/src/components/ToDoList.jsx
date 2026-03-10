import ToDoItem from "./ToDoItem.jsx";

const ToDoList = (todos) => {
  
  return (
    <section style={{ 
      padding: 0,
      background: 'transparent',
      border: 'none',
      marginTop: '20px',
      width: 'auto'
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '50px',
        margin: 0,
        padding: 0,
        border: '1px solid #ccc',
      }}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <ToDoItem
              id={todo.id}
              title={todo.title}
              description={todo.description}
              createdOn={todo.createdOn}
              isCompleted={todo.isCompleted}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ToDoList