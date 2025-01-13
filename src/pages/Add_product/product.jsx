import React from "react";

function UserForm() {
  const [userData, setUserData] = useState({
    name: "",
    type: "",
    price: "",
    quantity: 1,
    is_available : true,
    image: "",
  });

export default function product() {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du produit:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type de composant:</label>
        <input
          type="text"
          name="type"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Prix du produit:</label>
        <input
          type="text"
          name="price"
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
  )
}
