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
        setActiveEvents(data.filter(event => event.status !== "terminé",));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Action pour "Refuser"
  function rejectBorrow(borrowId, currentStatus) {
    if (currentStatus === "accepté") {
      Swal.fire({
        title: "Attention !",
        text: "Cet emprunt est déjà accepté. Voulez-vous vraiment le rejeter ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Oui, rejeter",
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          proceedWithRejection(borrowId);
        }
      });
    } else {
      proceedWithRejection(borrowId);
    }
  }

  function proceedWithRejection(borrowId) {
    fetch(`http://localhost:3000/borrows/${borrowId}/reject`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: data.success ? "Rejeté !" : "Erreur",
          text:
            data.message ||
            data.error ||
            "Le matériel a été marqué comme rejeté",
          icon: data.success ? "success" : "error",
        }).then(() => {
          if (data.success) {
            // Actualiser la page ou mettre à jour l'UI
            window.location.reload(); // ou votre logique de mise à jour
          }
        });
      })
      .catch((error) => {
        Swal.fire("Erreur", "Échec de la requête: " + error.message, "error");
      });
  }

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
      showCancelButton: status !== "rejeté" && status !== "terminé" , // Active le bouton "Rendu"
      showDenyButton: status !== "rejeté" && status !== "terminé", // Active le bouton "Accepter"
      confirmButtonText: "Fermer",
      cancelButtonText: "Refuser",
      denyButtonText: status === "en attente" ? "Accepter" : "Terminer",
      customClass: {
        denyButton: "custom-deny-btn", // Pour styliser
        cancelButton: "custom-cancel-btn",
      },
    }).then((result) => {
      if (result.isDenied) {
        if (status !== "accepté") {
          
        // Action pour "Accepter"
        fetch(`http://localhost:3000/borrows/${borrowId}/accept`, {
          method: "PATCH",
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              title: data.success ? "Accepté !" : "Erreur",
              text:
                data.message ||
                data.error ||
                "L'emprunt a été approuvé avec succès",
              icon: data.success ? "success" : "error",
            }).then((result) => {
              if (data.success && (result.isConfirmed || result.isDismissed)) {
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            Swal.fire(
              "Erreur",
              "Échec de la requête: " + error.message,
              "error"
            );
          });
      
        }else{

        // Action pour "Terminer"
        fetch(`http://localhost:3000/borrows/${borrowId}/done`, {
          method: "PATCH",
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              title: data.success ? "Terminé !" : "Erreur",
              text:
                data.message ||
                data.error ||
                "L'emprunt est marqué comme terminé",
              icon: data.success ? "success" : "error",
            }).then((result) => {
              if (data.success && (result.isConfirmed || result.isDismissed)) {
                window.location.reload();
              }
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Action pour "Refuser"
        rejectBorrow(borrowId, status);
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
          events={ events.map(event => ({
            ...event,
            color: event.status === "terminé" ? '#CCCCCC' : 
                   event.status === "en cours" ? '#3498DB' :
                    event.status === "en attente" ? '#F39C12' :
                    event.status === "accepté" ? '#2ECC71' :
                    event.status === "rejeté" ? '#E74C3C' : 
                   '#2ECC71' // Couleur par défaut
          }))}
          eventClick={handleEventClick}
        />
      )}
    </div>
  );
}
