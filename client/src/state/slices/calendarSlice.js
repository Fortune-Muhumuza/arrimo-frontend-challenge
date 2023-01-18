import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
  },
  reducers: {
    addEventReducer: (state, action) => {
      state.events.push(action.payload);
    },
    editEventReducer: (state, action) => {
      const { index, event } = action.payload;
      state.events[index] = event;
    },
    deleteEventReducer: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    fetchEventsReducer: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const {
  addEventReducer,
  editEventReducer,
  deleteEventReducer,
  fetchEventsReducer,
} = calendarSlice.actions;

export default calendarSlice.reducer;
