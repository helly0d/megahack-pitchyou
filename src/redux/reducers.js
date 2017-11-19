import { combineReducers } from "redux";

const reducers = {
  "LOGIN_USER": (state, action) => {
    return { ...state, user: action.payload };
  },
};


export default combineReducers({
  pitch: (state = {}, action) => {
    if (reducers[action.type]) {
      return reducers[action.type](state, action);
    }

    return state;
  },
});
