import {useState} from "react";
import {getTodos} from "../services/todos.js";

const SearchToDoForm = ({ setTodos }) => {
  const [search, setSearch] = useState('');
  const [sortItem, setSortItem] = useState('date'); // 'date' или 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' или 'desc'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setTodos(await getTodos({search, sortItem, sortOrder}));
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form
      method="GET"
      onSubmit={handleSubmit}
      className="todo-form"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'flex-end',
      }}
    >
      {/* Поле поиска по названию */}
      
      <input
        type="text"
        id="search"
        value={search}
        className="focusable todo-form__input"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск..."
      />
      
      {/* Выбор критерия сортировки */}
      <select
        id="sortItem"
        value={sortItem}
        className="focusable todo-form__select"
        onChange={(e) => setSortItem(e.target.value)}
      >
        <option value="date">Сортировать по дате</option>
        <option value="title">Сортировать по алфавиту</option>
      </select>

      {/* Выбор порядка сортировки */}
      
      <select
        id="sortOrder"
        value={sortOrder}
        className="focusable todo-form__select"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      

      {/* Кнопка поиска */}
      <button
        className="focusable todo-form__button"
        type="submit"
      >
        Поиск
      </button>
    </form>
  )
}

export default SearchToDoForm