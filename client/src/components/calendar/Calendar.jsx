import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { Layout } from "antd";
import "./Calendar.css";
import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

function UserCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([
    { title: "Meeting", start: new Date() },
  ]);

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
    const event = {
      title: e.target.eventTitle.value,
      start: selectedDates[0],
      end: selectedDates[1],
    };
    setEvents([...events, event]);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      title: eventTitle,
      start: selectedDates[0],
      end: selectedDates[1],
    };
    console.log("event", event);
    setEvents([...events, event]);
    toggleModal();
  };

  return (
    <Layout>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        select={handleSelect}
        unselect={modalVisible ? null : () => setSelectedDates([])}
        events={events}
        weekends={false}
        className="calendar-container"
      />
      <Modal
        title="Add Event"
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
            <Button type="primary" onClick={handleAddEvent}>
              Add Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default UserCalendar;
