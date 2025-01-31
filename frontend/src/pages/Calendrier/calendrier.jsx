import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Pour gérer les clics sur événements
import Swal from "sweetalert2"; // Pour afficher la description
import "./calendrier.css";

export default function Calendrier() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Réunion d'équipe",
      date: "2025-02-05",
      description: "Discussion sur l'avancement du projet X",
    },
    {
      id: "2",
      title: "Livraison projet",
      date: "2025-02-10",
      description: "Livraison de la V1 du projet au client",
    },
  ]);

  // Fonction exécutée lorsqu'on clique sur un événement
  const handleEventClick = (clickInfo) => {
    Swal.fire({
      title: clickInfo.event.title,
      text: clickInfo.event.extendedProps.description || "Aucune description disponible",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="cal">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev next",
        }}
        aspectRatio={2}
        events={events}
        eventClick={handleEventClick} // Gérer le clic sur un événement
      />
    </div>
  );
}
