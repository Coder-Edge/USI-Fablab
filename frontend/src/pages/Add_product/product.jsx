import React, { useState } from "react";

export default function Product() {
  const [img, setImg] = useState("");

  const submit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const formdata = new FormData();
    formdata.append("image", img);

    fetch("http://localhost:3000/single/", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json()) // Assure-toi que le serveur retourne une réponse JSON
      .then((data) => {
        console.log("Réponse du serveur :", data);
      })
      .catch((err) => {
        console.error("Erreur :", err);
      });
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="image">URL de l'image :</label>
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          accept="image/*"
        />
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
}
