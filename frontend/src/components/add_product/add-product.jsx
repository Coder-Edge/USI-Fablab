import { useState } from "react"
import ButtonAdd from "../stocks/button-add"
import "./add-product.css"

const AddProduct = () => {

  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const closeForm = () => {
    document.querySelector("#add-product").style.visibility = "hidden"
 }

  return (
    <form id="add-product">
      <div className="add-product">
        <div className="content">
          <div className="header">
            <button type="button" onClick={closeForm}>X</button>
            <h3>Formulire d'ajout d'un nouveau composant</h3>
          </div>
          <div className="component">
            <img src="src/assets/add-image.svg" alt="Add image" />
            <div className="input">
              <div className="field-input">
                <label htmlFor="name">Nom du composant</label>
                <input type="text" id="name"/>
              </div>
              <div className="field-input">
                <label htmlFor="type">Type du composant</label>
                <input type="text" id="type" />
              </div>
            </div>
          </div>
          <div className="info">
            <div className="field-input">
              <label htmlFor="price">Prix: </label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value >= 0? parseInt(e.target.value): price)}/>
              <select name="device">
                <option value="$">$</option>
                <option value="CDF">CDF</option>
              </select>
            </div>
            <div className="field-input">
              <label htmlFor="quantity">Quantité: </label>
              <button type="button" id="quantity" onClick={() => setQuantity((e) => (e > 1? e-1: e))}>&lt;</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value >= 0? parseInt(e.target.value): quantity )}/>
              <button type="button" onClick={() => setQuantity((e) => (e+1))}>&gt;</button>
            </div>
          </div>
          <ButtonAdd child="Confirmer" type="submit" />
        </div>
      </div>
    </form>
  )
}

export default AddProduct