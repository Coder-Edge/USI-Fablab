import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendrier.css";

export default function Calendrier() {
  return (
    <div className="cal">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "today",
                center: "title",
                end: "prev next",
              }}
              aspectRatio={2}
              events = {
                [
                    
                ]
              }
            />
          </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d04549314d070e427f8ba3d228ae11303308b8da
