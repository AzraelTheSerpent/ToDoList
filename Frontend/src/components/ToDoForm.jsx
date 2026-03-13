import AddToDoForm from "./AddToDoForm.jsx";
import SearchToDoForm from "./SearchToDoForm.jsx";

const ToDoForm = ({setTodos}) => {
  return (
    <section className="todo-form-container">
      <AddToDoForm setTodos={setTodos} />
      <SearchToDoForm setTodos={setTodos} />
    </section>
  )
}

export default ToDoForm