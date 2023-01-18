import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, action) => {
      const { index, event } = action.payload;
      state.events[index] = event;
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    fetchEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});
