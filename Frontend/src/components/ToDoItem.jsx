const ToDoItem = ({
    id, 
    title, 
    description, 
    createdOn, 
    isCompleted 
  }) => {

  const formattedDate = new Date(createdOn + 'Z').toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#1C1C1C',
      boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
      border: 'none',
      borderRadius: '10px',
      minWidth: '300px',
      width: 'auto',
      maxWidth: '500px',
    }}>
      <h3 style={{fontSize: '30px'}}>{title}</h3>
      <hr style={{
        color: 'transparent',
        backgroundColor: 'transparent',
        border: '2px solid teal'
      }}/>
      <p>{description}</p>
      <hr style={{
        color: 'transparent',
        backgroundColor: 'transparent',
        border: '2px solid teal'
      }}/>
      <small>{formattedDate}</small>
      <input
        type="checkbox"
        checked={isCompleted}
        disabled
        style={{ marginLeft: '8px' }}
        />
    </div>
  )
}

export default ToDoItem