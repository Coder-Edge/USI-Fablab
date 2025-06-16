import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import "./calendrier.css";
import { NavParams } from "../../components/Navbar/navParams";
import Spinner from "../../components/spinner/spinner";

export default function Calendrier({ setNavActive }) {
  const [events, setEvents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Chargement des événements depuis l'API
  useEffect(() => {
    setNavActive(NavParams.calendrier);

    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/calendar");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des événements");
        }
        const data = await response.json();
        setEvents(data);
        console.log("Événements chargés :", data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
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
    const borrowId = clickInfo.event.id;
    const status = clickInfo.event.extendedProps.status;
    const statusHTML = `
  <p><strong>Statut :</strong> 
    <span style="color: ${
      status === "accepté" ? "green" : status === "rejeté" ? "red" : "orange" // Par défaut pour "en attente" ou tout autre statut
    }">
      ${status.toUpperCase()}
    </span>
  </p>
`;
    Swal.fire({
      title: "Détails de l'emprunt",
      html: `
        <p><strong>Nom de l'emprunteur :</strong> ${
          user.charAt(0).toUpperCase() + user.slice(1)
        }</p>
        <br><hr><br>
        <p><strong>Description :</strong> ${description}</p>
        <br><hr><br>
        ${statusHTML}
        <br><hr>
        <p><strong>Date de début :</strong> ${startDate}</p>
        <p><strong>Date de retour :</strong> ${endDate}</p>
      `,
      icon: "info",
      showCancelButton: true, // Active le bouton "Rendu"
      showDenyButton: true, // Active le bouton "Accepter"
      confirmButtonText: "Fermer",
      cancelButtonText: "Refuser",
      denyButtonText: "Accepter",
      customClass: {
        denyButton: "custom-deny-btn", // Pour styliser
        cancelButton: "custom-cancel-btn",
      },
    }).then((result) => {
      if (result.isDenied) {
        // Action pour "Accepter"
        fetch(`http://localhost:3000/borrows/${borrowId}/accept`, {
          method: "PATCH",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: data.success ? "Accepté !" : "Erreur",
              text:
                data.message ||
                data.error ||
                "L'emprunt a été approuvé avec succès",
              icon: data.success ? "success" : "error",
            });
          })
          .catch((error) => {
            Swal.fire(
              "Erreur",
              "Échec de la requête: " + error.message,
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Action pour "Refuser"
        fetch(`http://localhost:3000/borrows/${borrowId}/reject`, {
          method: "PATCH",
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              title: data.success ? "Rejeté !" : "Erreur",
              text: data.message || data.error || "Le matériel a été marqué comme rejeté",
              icon: data.success ? "success" : "error",
            });
          })
          .catch((error) => {
            Swal.fire(
              "Erreur",
              "Échec de la requête: " + error.message,
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="cal">
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}
