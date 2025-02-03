import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import "./calendrier.css";

export default function Calendrier() {
  const [events, setEvents] = useState([]);

  // Chargement des événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/calendar");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des événements");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchEvents();
  }, []);

  // Gestion du clic sur un événement
  const handleEventClick = (clickInfo) => {
    const user = clickInfo.event.title.split(":")[1] || "Unknown";
    const description =
      clickInfo.event.extendedProps.description ||
      "Aucune description disponible";
    const startDate = clickInfo.event.start
      ? clickInfo.event.start.toLocaleDateString()
      : "Date inconnue";
    const endDate = clickInfo.event.end
      ? clickInfo.event.end.toLocaleDateString()
      : "Date inconnue";

    Swal.fire({
      title: "Détails de l'emprunt",
      html: `
        <p><strong>Nom de l'emprunteur :</strong> ${
          user.charAt(1).toUpperCase() + user.slice(2)
        }</p>
        <br>
        <hr>
        <br>
        <p><strong>Description :</strong> ${description}</p>
        <br>
        <hr>
        <p><strong>Date de début :</strong> ${startDate}</p>
        <p><strong>Date de retour :</strong> ${endDate}</p>
      `,
      icon: "info",
      confirmButtonText: "Fermer",
      showCancelButton: true,
      cancelButtonText: "Détails",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Détails supplémentaires",
          text: "Plus d'informations seront bientôt disponibles.",
          icon: "info",
        });
      }
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
        eventClick={handleEventClick}
      />
    </div>
  );
}
