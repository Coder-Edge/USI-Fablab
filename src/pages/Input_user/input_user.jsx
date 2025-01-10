import React, { useState } from "react";

function UserForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    usertype:"",
  });

  // Fonction pour mettre à jour le state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value, // Met à jour la propriété correspondant au champ
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    alert(userData) // Affiche les données utilisateur
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
            name="usertype"
            value={userData.usertype}
            onChange={handleChange}
                >
                <option value="Membrer">Membrer</option>
                <option value="Student">Student</option>
                <option value="Extern">Extern</option>
        </select>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default UserForm;
