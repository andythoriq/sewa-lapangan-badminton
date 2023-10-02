import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Hari Kesaktian Pancasila",
    allDay: true,
    start: new Date(2023, 9, 1),
    end: new Date(2023, 9, 1),
  },
  {
    title: "Hari Natal",
    allDay: true,
    start: new Date(2023, 11, 25),
    end: new Date(2023, 11, 26),
  },
];

function Kalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allevents, setAllEvent] = useState(events);
  function handleAddEvent() {
    setAllEvent([...allevents, newEvent]);
  }
  return (
    <div className="calendar">
        <h3 className="mt-2">Calendar</h3>
      <div className=" row g-3 align-items-center mt-2 col align-self-center">
        <div className="col-12">
            <input className="form-control" type="text" placeholder="add title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        </div>
        <div className="col-12">
            <DatePicker className="form-control" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start: start })} />
        </div>
        <div className="col-12 col-md-6 mb-3">
            <DatePicker className="form-control" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        </div>
      </div>
      <button onClick={handleAddEvent} className="btn btn-danger btn-sm text-right">
          Add event
        </button>
      <Calendar selectable showMultiDayTimes localizer={localizer} events={allevents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </div>
  );
}

export default Kalendar;
