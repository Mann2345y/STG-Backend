import {
  LOGGED_USER_CHANGE_REQUEST,
  LOGGED_USER_LOGIN_SUCCESS,
  LOGGED_USER_UPDATE_SUCCESS,
  LOGGED_USER_REMOVE_SUCCESS,
  LOGGED_USER_CHANGE_FAIL,
  LOGGED_USER_LOGOUT,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  CREATE_USER_FAIL,
  LOGGED_USER_CHANGE_SUCCESS,
} from "../constants/userConstants";

export const loggedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST: {
      return { loading: true, user: {} };
    }
    case CREATE_USER_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case CREATE_USER_FAIL: {
      return { loading: false, error: action.payload };
    }
    case LOGGED_USER_CHANGE_REQUEST: {
      return { loading: true, user: { ...state.user } };
    }
    case LOGGED_USER_CHANGE_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case LOGGED_USER_LOGIN_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case LOGGED_USER_UPDATE_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case LOGGED_USER_REMOVE_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case LOGGED_USER_CHANGE_FAIL: {
      return { loading: false, error: action.payload, user: {} };
    }
    case LOGGED_USER_LOGOUT: {
      return { loading: false, user: {} };
    }
    default:
      return state;
  }
};

export const allUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST: {
      return { loading: true, user: {} };
    }
    case GET_ALL_USERS_SUCCESS: {
      return { loading: false, users: action.payload };
    }
    case GET_ALL_USERS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
