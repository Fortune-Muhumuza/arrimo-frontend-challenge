import axios from "axios";
import { baseUrl } from "../../baseVariables";
import {
  setUsers,
  addUserReducer,
  editUserReducer,
} from "../slices/usersSlice";

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    dispatch(setUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, user);
    dispatch(addUserReducer(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (user, index) => async (dispatch) => {
  try {
    const response = await axios.put(`${baseUrl}/users/${user._id}`, user);
    dispatch(editUserReducer({ user: response.data, index }));
  } catch (error) {
    console.log(error);
  }
};
