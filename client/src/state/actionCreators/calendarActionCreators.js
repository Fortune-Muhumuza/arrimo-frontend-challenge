import { baseUrl } from "../../baseVariables";
import {
  addEventReducer,
  deleteEventReducer,
  editEventReducer,
  fetchEventsReducer,
} from "../slices/calendarSlice";

export const addEvent = (event) => async (dispatch) => {
  try {
    await fetch(`${baseUrl}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    dispatch(addEventReducer(event));
  } catch (error) {
    console.log(error);
  }
};

export const editEvent = (event, index) => async (dispatch) => {
  try {
    await fetch(`${baseUrl}/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    dispatch(editEventReducer({ index, event }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await fetch(`${baseUrl}/events/${id}`, {
      method: "DELETE",
    });
    dispatch(deleteEventReducer(id));
  } catch (error) {
    console.log(error);
  }
};

export const fetchEvents = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/events`);
    const data = await response.json();
    dispatch(fetchEventsReducer(data.events));
  } catch (error) {
    console.log(error);
  }
};
