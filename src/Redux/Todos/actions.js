import { v4 as uuid } from "uuid";
import axios from "axios";

export const actionConstants = {
  GET_TODOS_REQUEST: "GET_TODOS_REQUEST",
  GET_TODOS_SUCCESS: "GET_TODOS_SUCCESS",
  GET_TODOS_FAILURE: "GET_TODOS_FAILURE",
  ADD_TODOS_REQUEST: "ADD_TODOS_REQUEST",
  ADD_TODOS_SUCCESS: "ADD_TODOS_SUCCESS",
  ADD_TODOS_FAILURE: "ADD_TODOS_FAILURE",
  TOGGLE_REQUEST: "TOGGLE_REQUEST",
  TOGGLE_SUCCESS: "TOGGLE_SUCCESS",
  TOGGLE_FAILURE: "TOGGLE_FAILURE"
};

//action creators

const addTodosRequest = () => {
  return {
    type: actionConstants.ADD_TODOS_REQUEST,
    payload: {
      isLoading: true,
      isError: false
    }
  };
};

const addTodosSuccess = (text, status) => {
  return {
    type: actionConstants.ADD_TODOS_SUCCESS,
    payload: {
      title: text,
      status: false,
      id: uuid()
    }
  };
};

const addTodosFailure = (err) => {
  return {
    type: actionConstants.ADD_TODOS_FAILURE,
    payload: {
      errorMessage: err
    }
  };
};

const getTodosRequest = () => {
  return {
    type: actionConstants.GET_TODOS_REQUEST,
    payload: {
      isLoading: true,
      isError: false
    }
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: actionConstants.GET_TODOS_SUCCESS,
    payload: {
      isLoading: false,
      isError: false,
      todos: todos
    }
  };
};

const getTodosFailure = (err) => {
  return {
    type: actionConstants.GET_TODOS_FAILURE,
    payload: {
      isLoading: false,
      isError: true,
      errorMessage: err
    }
  };
};

// Toggle

const toggleRequest = () => {
  return {
    type: actionConstants.TOGGLE_REQUEST,
    payload: {
      isLoading: true
    }
  };
};

const toggleSuccess = () => {
  return {
    type: actionConstants.TOGGLE_SUCCESS,
    payload: {
      isLoading: false,
      isError: false
    }
  };
};

const toggleFailure = (err) => {
  return {
    type: actionConstants.TOGGLE_FAILURE,
    payload: {
      isLoading: false,
      isError: true,
      errorMessage: err
    }
  };
};

// thunk creators
const getTodos = () => async (dispatch) => {
  dispatch(getTodosRequest());
  await fetch("https://basic-json-server-mocker.herokuapp.com/tasks")
    .then((res) => res.json())
    .then((res) => dispatch(getTodosSuccess(res)))
    .catch((err) => {
      dispatch(getTodosFailure(err));
    });
};

const addTodos = (text, status) => async (dispatch) => {
  dispatch(addTodosRequest());
  try {
    const data = await axios.post(
      "https://basic-json-server-mocker.herokuapp.com/tasks",
      {
        title: text,
        status: false
      }
    );
    dispatch(addTodosSuccess(text, status));
    dispatch(getTodos());
  } catch (err) {
    dispatch(addTodosFailure(err));
    console.log("Caught error", err);
  }
};

const toggleTodos = (id, status) => async (dispatch) => {
  console.log(id, status);
  dispatch(toggleRequest());
  await axios
    .patch(`https://basic-json-server-mocker.herokuapp.com/tasks/${id}`, {
      status: !Boolean(status)
    })
    .then(() => {
      dispatch(toggleSuccess());
      dispatch(getTodos());
    })
    .catch((err) => {
      dispatch(toggleFailure(err));
    });
};

export { getTodos, addTodos, toggleTodos };
