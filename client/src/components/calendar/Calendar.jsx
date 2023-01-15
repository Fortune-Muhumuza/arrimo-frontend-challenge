import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";

const events = [{ title: "Meeting", start: new Date() }];

function UserCalendar() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        className="calendar-container"
      />
    </div>
  );
}

export default UserCalendar;
