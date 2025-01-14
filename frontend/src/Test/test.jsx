import React, { useState } from "react";

export default function Product() {
  // const [userData, setUserData] = useState({
  //   name: "",
  //   type: "",
  //   price: "",
  //   quantity: 1,
  //   is_available: true,
  //   image: "",
  // });

  const [image, setImage] = useState("");
  const formdata = new FormData;
  formdata.append("");
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleSubmit = () => {
    fetch("http://localhost:3000/single/",{
      method: "POST",
      body: formdata,
    })
    .then((res) =>{
      console.log(res.msg)
    }
    )
    .catch((err) => {
      console.log(err)
    })
    // Ajoutez ici la logique d'envoi des données au serveur
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <label htmlFor="name">Nom du produit :</label>
        <input
          id="name"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="type">Type de composant :</label>
        <input
          id="type"
          type="text"
          name="type"
          value={userData.type}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="price">Prix du produit :</label>
        <input
          id="price"
          type="number"
          name="price"
          value={userData.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="quantity">Quantité :</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={userData.quantity}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div>
        <label htmlFor="is_available">Disponible :</label>
        <input
          id="is_available"
          type="checkbox"
          name="is_available"
          checked={userData.is_available}
          onChange={handleChange}
        />
      </div> */}

      <div> 
        <label htmlFor="image">URL de l'image :</label>
        <input
          id="image"
          type="file"
          name="image"
          // value={userData.image}
          onChange={(e) => {console.log(setImage(e.target.files[0]))}}
          accept="image/*"
        />
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
}
