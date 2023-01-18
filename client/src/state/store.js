import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import userReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: { users: userReducer, calendar: calendarReducer, auth: authReducer },
});
