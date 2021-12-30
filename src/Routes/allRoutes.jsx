import { Route, Switch } from "react-router-dom";
import Login from "../Components/Login";
import Todos from "../Components/Todos/Todos";

function AllRoutes() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Todos />
      </Route>
      <Route>{<div>404</div>}</Route>
    </Switch>
  );
}

export default AllRoutes;
