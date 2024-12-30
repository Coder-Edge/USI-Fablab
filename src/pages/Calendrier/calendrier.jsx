import React from "react";
import ReactDom from "react-dom/client";
import Navbar from "../../components/Navbar/navbar";
import Header from "../../components/Header/header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendrier.css";

export default function Calendrier() {
  return (
    <>
      <main>
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
      </main>
  
    </>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(<Calendrier />);
