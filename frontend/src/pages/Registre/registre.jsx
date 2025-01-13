import React, { useState } from "react";


function UserForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    usertype:"Member",
  });

  // Fonction pour mettre à jour le state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value, // Met à jour la propriété correspondant au champ
    }));
  };

  const insertUsers = async (users) => {
    try {
      const response = await fetch("http://localhost:3000/registre/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users), // Convertir les utilisateurs en JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Résultat de l'opération :", result);
      } else {
        console.error("Erreur lors de l'insertion :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    insertUsers(userData); // Affiche les données utilisateur
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>UserType:</label>
        <select
            name="userType"
            value={userData.usertype}
            onChange={handleChange}
                >
                <option value="Member">Member</option>
                <option value="Student">Student</option>
                <option value="Extern">Extern</option>
        </select>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default UserForm;
