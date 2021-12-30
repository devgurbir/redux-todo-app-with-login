import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTodos } from "../../Redux/Todos/actions";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function Todos() {
  const dispatch = useDispatch();
  const todosArray = useSelector((state) => state.todo.todos);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <h3>Todos</h3>
      {/* Add TodoInput & TodoList for */}
      <TodoInput />
      <TodoList todos={todosArray} />
    </div>
  );
}

export default Todos;
