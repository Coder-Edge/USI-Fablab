import React, { useState } from "react";

export default function ProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: 1,
    type: "",
    is_available: true,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("type", productData.type);
    formData.append("is_available", productData.is_available);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Produit enregistré avec succès !");
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Prix :</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quantité :</label>
        <input
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Type :</label>
        <input
          type="text"
          name="type"
          value={productData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Disponible :</label>
        <input
          type="checkbox"
          name="is_available"
          checked={productData.is_available}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image :</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
      </div>
      <button type="submit">Enregistrer le produit</button>
    </form>
  );
}
