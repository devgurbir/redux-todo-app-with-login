import { useDispatch } from "react-redux";
import { toggleTodos } from "../../Redux/Todos/actions";

function TodoListItem({ title, status, id }) {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <p>{title}</p>
      <span>{status ? "true" : "false"}</span>
      <button onClick={() => dispatch(toggleTodos(id, status))}>Toggle</button>
      <button>Delete</button>
    </div>
  );
}

export default TodoListItem;
