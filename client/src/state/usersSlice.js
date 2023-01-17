import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../baseVariables";

const initialState = {
  users: [],
  editIndex: -1,
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    dispatch(setUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      axios
        .post(`${baseUrl}/users`, action.payload)
        .then((response) => {
          state.users = [...state.users, response.data];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser: (state, action) => {
      axios
        .put(`${baseUrl}/users/${action.payload.user._id}`, action.payload.user)
        .then((response) => {
          state.users = state.users.map((user, index) => {
            if (index === action.payload.index) {
              return response.data;
            }
            return user;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser: (state, action) => {
      axios
        .delete(`${baseUrl}/users/${action.payload._id}`)
        .then((response) => {
          state.users = state.users.filter(
            (user, index) => index !== action.payload.index
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setEditIndex: (state, action) => {
      state.editIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser, setEditIndex, setUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
