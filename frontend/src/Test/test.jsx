import React, { useState, useEffect } from "react";
import { MdHeight } from "react-icons/md";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/get/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Type: {product.type}</p>
            <p>
              <img
                src={`http://localhost:3000/img/${product.image}`}
                alt={product.name}
                width="100"
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
