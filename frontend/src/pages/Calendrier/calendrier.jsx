import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import "./calendrier.css";
import { NavParams } from "../../components/Navbar/navParams";

export default function Calendrier({setNavActive}) {
  const [events, setEvents] = useState([]);

  // Chargement des événements depuis l'API
  useEffect(() => {
    setNavActive(NavParams.calendrier)

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
        <p><strong>Nom de l'emprunteur :</strong> ${user.charAt(0).toUpperCase() + user.slice(1)}</p>
        <br><hr><br>
        <p><strong>Description :</strong> ${description}</p>
        <br><hr>
        <p><strong>Date de début :</strong> ${startDate}</p>
        <p><strong>Date de retour :</strong> ${endDate}</p>
      `,
      icon: "info",
      showCancelButton: true, // Active le bouton "Rendu"
      showDenyButton: true,   // Active le bouton "Accepter"
      confirmButtonText: "Fermer",
      cancelButtonText: "Refuser",
      denyButtonText: "Accepter",
      customClass: {
        denyButton: 'custom-deny-btn', // Pour styliser
        cancelButton: 'custom-cancel-btn'
      },
    }).then((result) => {
      if (result.isDenied) {
        // Action pour "Accepter"
        Swal.fire("Accepté !", "L'emprunt a été approuvé.", "success");
        // Ajoutez ici votre logique d'acceptation (ex: appel API)
        fetch(`http://localhost:3000/borrows/${borrowId}/accept`, { method: "PATCH" });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Action pour "Refuser"
        Swal.fire("Rejeté !", "Le matériel est marqué comme rejeté.", "success");
        // Logique pour mettre à jour le statut
        fetch(`http://localhost:3000/borrows/${borrowId}/reject`, { method: "PATCH" });

      } else if (result.isConfirmed) {
        // Action pour "Fermer" (par défaut, la popup se ferme)
        console.log("Fermeture de la boîte de dialogue");
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
