import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  editIndex: -1,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    editUser: (state, action) => {
      state.users = state.users.map((user, index) => {
        if (index === action.payload.index) {
          return action.payload.user;
        }
        return user;
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user, index) => index !== action.payload
      );
    },
    setEditIndex: (state, action) => {
      state.editIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser, setEditIndex } =
  usersSlice.actions;

export default usersSlice.reducer;
