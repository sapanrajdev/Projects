import { constants } from "../constants/constants";

const initialState = {
  users: [],
};

export function users(state = initialState, action) {
  switch (action.type) {
    case constants.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data
      };
    case constants.USER_REGISTRATION_SUCCESS:
      let users = [...state.users];
      users.push(action.payload);
      return {
        ...state,
        user: action.payload,
        users
      };
      
    default:
      return state;
  }
}
