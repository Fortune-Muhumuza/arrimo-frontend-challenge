import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseVariables";

const initialState = {
  users: [],
  editIndex: -1,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUserReducer: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    editUserReducer: (state, action) => {
      state.users = state.users.map((user, i) => {
        if (i === action.payload.index) {
          return action.payload.user;
        }
        return user;
      });
    },
    deleteUser: (state, action) => {
      axios
        .delete(`${baseUrl}/users/${action.payload}`)
        .then((response) => {
          state.users = state.users.filter(
            (user, index) => index !== action.payload
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
export const {
  addUserReducer,
  editUserReducer,
  deleteUser,
  setEditIndex,
  setUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
