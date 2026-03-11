import AddToDoForm from "./AddToDoForm.jsx";
import SearchToDoForm from "./SearchToDoForm.jsx";

const ToDoForm = ({setTodos}) => {
  return (
    <section style={{ 
      display: "flex",
      flexDirection: "column",
      gap: '10px',
    }}>
      <AddToDoForm setTodos={setTodos} />
      <SearchToDoForm setTodos={setTodos} />
    </section>
  )
}

export default ToDoForm