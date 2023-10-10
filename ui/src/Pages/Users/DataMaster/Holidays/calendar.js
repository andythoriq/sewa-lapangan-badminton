import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import multiMonthPlugin from '@fullcalendar/multimonth'
import { INITIAL_EVENTS, createEventId } from './calendar_data'
import './calendar.css';
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import axios from "../../../../api/axios";
import secureLocalStorage from "react-secure-storage";

export default function Calendar() {

  const [holidays, setHolidays] = useState([])
  const [ currentEvents, setCurrentEvents ] = useState([]);

  useEffect(() => {
    axios.get('/api/calendar', {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    }).then(({ data }) => {
      setHolidays(data)
    }).catch((e) => {
      Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
    })
  },[])

  const handleDateSelect = (selectInfo) => {
    handleAddEvent(selectInfo)
  }

  const handleEventDrop = (dropInfo) => {
    console.log(dropInfo);
    const { start, end } = dropInfo.oldEvent._instance.range;
    console.log(start, end);
    const {
      start: newStart,
      end: newEnd
    } = dropInfo.event._instance.range;
    console.log(newStart, newEnd);
    
    if (new Date(start).getDate() === new Date(newStart).getDate()) {
      dropInfo.revert();
    }
  }

  const handleEventClick = (clickInfo) => {
    // console.log(clickInfo);
    Swal.fire({
      title: 'Do you want to edit or delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      denyButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleAddEvent(clickInfo, clickInfo.event.title);
      } else if (result.isDenied) {
        handleDelete(clickInfo);
      }
    })
  }

  const handleEvents = (events) => setCurrentEvents(events)

  const handleAddEvent = (selectInfo, value="") => {
    // console.log(selectInfo);
    const ifEdit = (value) ? true:false;
    var startDate=""; var endDate="";
    if (ifEdit) {
      startDate = selectInfo.event.startStr;
      endDate = (selectInfo.event.endStr) ? selectInfo.event.endStr:"";
    }else{
      startDate = selectInfo.startStr;
      endDate = (selectInfo.endStr) ? selectInfo.endStr:"";
    }

    const minDate = startDate;
    var maxDate="";
    if (endDate) {
      var date = new Date(endDate);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = (month < 10) ? `0${month}`:month;
      var day = date.getDate() - 1;
      day = (day < 10) ? `0${day}`:day;
      maxDate = `${year}-${month}-${day}`;
    }else{
      maxDate = startDate;
    }


    var selectDate = `${minDate} to ${maxDate}`;
    if (minDate===maxDate) selectDate=minDate;
    
    Swal.fire({
      title: 'Your event',
      input: 'text',
      inputLabel: `${ifEdit?'Edit':'Create'} an event from ${selectDate}`,
      inputValue: value,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        var newEvent={};
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
        if (ifEdit) {
          // Start API Proses Edit
          selectInfo.event.remove();
          newEvent = {
            id: selectInfo.event.id,
            title:value,
            start: selectInfo.event.startStr,
            end: selectInfo.event.endStr,
            allDay: selectInfo.event.allDay
          }
          // Update Event
          calendarApi.addEvent(newEvent)
          setTimeout(function() {
            Swal.fire({ icon: "success", title: "Success!", html: "saved successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
          }, 100)
          // End API Proses Edit
        }else{
          // Start API Proses Add
          newEvent = {
            id: createEventId(),
            title:value,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          }
          // Add Event
          calendarApi.addEvent(newEvent)
          setTimeout(function() {
            Swal.fire({ icon: "success", title: "Success!", html: "saved successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
          }, 100)
          // End API Proses Add
        }
      }
    })
  }

  const handleDelete = (clickInfo) => {
    Swal.fire({
      title: 'Are you sure ?',
      html: `Permanent delete '<b>${clickInfo.event.title}</b>'`,
      icon: 'info',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        clickInfo.event.remove()
        // Start API Proses Delete
        setTimeout(function() {
          Swal.fire({ icon: "success", title: "Success!", html: "deleted successfully", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey: false, timer: 2000 });
        }, 100)
        // End API Proses Delete
      }
    });
  }

  return (
    <>
      <div className="container" style={{ background: "white", }}>
        <FullCalendar
          plugins={[ multiMonthPlugin, interactionPlugin ]}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'today next'
          }}
          initialView='multiMonthYear'
          initialEvents={holidays} // alternatively, use the `events` setting to fetch from a feed
          selectable={true}
          droppable={true}
          editable={true} // aktifkan eventDrop
          eventsSet={handleEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          select={handleDateSelect}
          eventDrop={handleEventDrop}
        />
      </div>

    </>
  );
}


const renderEventContent = (eventInfo) => {
  // console.log(eventInfo);
  var datenya = "";
  if ((eventInfo.event.startStr === eventInfo.event.endStr) || eventInfo.event.endStr === "") {
    datenya = eventInfo.event.startStr;
  }else{
    datenya = `From ${eventInfo.event.startStr} to ${eventInfo.event.endStr}`;
  }
  return (
    <>
      <div className="container container-calendar ">
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={
          <Popover id={`popover-positioned-top`}>
            <Popover.Header as="h3">{eventInfo.event.title}</Popover.Header>
            <Popover.Body>
              {datenya}
            </Popover.Body>
          </Popover>
        }
      >
      {/* <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i> */}
      <div className="d-grid gap-2 calendarHover">
        <Button size="sm">{eventInfo.event.title}</Button>
      </div>
      </OverlayTrigger>
      </div>
      
    </>
  )
}
