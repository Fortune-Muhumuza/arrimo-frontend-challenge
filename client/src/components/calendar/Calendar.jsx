import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { Layout } from "antd";
import "../styles/Calendar.css";
import { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { baseUrl } from "../../baseVariables";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  fetchEvents,
} from "../../state/actionCreators/calendarActionCreators";

function UserCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [eventTitle, setEventTitle] = useState("");
  const events = useSelector((state) => state.calendar.events);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dispatch = useDispatch();

  const handleEventClick = (info) => {
    console.log("info", info.event);
    setSelectedEvent(info.event);
    setEventTitle(info.event.title);
    setSelectedDates([info.event.startStr, info.event.endStr]);
    // setFormMode("edit");
    setFormMode("delete");
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelect = (info) => {
    console.log("info", info);
    setSelectedDates([info.startStr, info.endStr]);
    toggleModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === "create") {
      handleAddEvent(e);
    } else if (formMode === "edit") {
      handleEditEvent(e);
    } else if (formMode === "delete") {
      handleDeleteEvent();
    }
    setEventTitle("");
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    setFormMode("delete");
    toggleModal();
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      title: eventTitle,
      start: selectedEvent.start,
      end: selectedEvent.end,
      id: selectedEvent.id,
    };
    const updatedEvents = [...events];
    const index = updatedEvents.findIndex(
      (event) => event.id === selectedEvent.id
    );
    updatedEvents[index] = { ...updatedEvents[index], title: eventTitle };
    setEvents(updatedEvents);
    toggleModal();
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      title: eventTitle,
      start: selectedDates[0],
      end: selectedDates[1],
      id: Math.random(),
    };
    setEvents([...events, event]);
    dispatch(addEvent(event));
    toggleModal();
  };

  const handleFetchEvents = () => {
    dispatch(fetchEvents());
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  return (
    <Layout>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        select={handleSelect}
        unselect={modalVisible ? null : () => setSelectedDates([])}
        events={events}
        eventClick={handleEventClick}
        // weekends={false}
        className="calendar-container"
      />
      <Modal
        title={
          formMode === "create"
            ? "Add Event"
            : formMode === "edit"
            ? "Edit Event"
            : "Delete Event"
        }
        open={modalVisible}
        onCancel={() => {
          toggleModal();
          setSelectedDates([]);
        }}
        footer={null}
      >
        <Form>
          <Form.Item label="Event Title">
            <Input
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <Input value={selectedDates[0]} disabled />
          </Form.Item>
          <Form.Item label="End Date">
            <Input value={selectedDates[1]} disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit} formMode={formMode}>
              {formMode === "create"
                ? "Add Event"
                : formMode === "edit"
                ? "Save Event"
                : "Delete Event"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default UserCalendar;
