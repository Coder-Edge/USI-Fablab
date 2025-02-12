import { useRef, useState } from "react"
import ButtonAdd from "../stocks/button-add"
import "./add-product.css"
import axios from "../../api/api"

const AddProduct = () => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [typeSelected, setTypeSelected] = useState("motor")
  const [quantity, setQuantity] = useState(1)

  const imageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const [errorImage, setErrorImage] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeForm = () => {
    setErrorMessage("")
    setImage(null)
    setImagePreview(null)
    setErrorImage("")
    setErrorName("")
    setName("")
    setPrice(0)
    setQuantity(1)

    document.querySelector("#add-product").style.visibility = "hidden"
  }

  // la gestion de la section de l'image
  const handleImageClick = () => {
    imageRef.current.click()
  }

  // la gestion de l'image sélectionée
  const handleFileChange = (e) => {
    const file = e.target.files[0];


    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Envoie du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!image) return setErrorImage("*veuillez choisir une image");
    setErrorImage("")
    if (!name) return setErrorName("*Ce champs doit être remplis ");
    setErrorName("")
    if (!price) return setErrorMessage("*Ces valeurs ne doivent pas être nulle");
    setErrorMessage("")

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("type", typeSelected);
    formData.append("is_available", true);
    formData.append("image", image);

    sendData(formData);
    
    closeForm()
  }

  // Envoie des données
  const sendData = async (data) => {
    await axios.post("/products", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      
    })
  }

  return (
    <form id="add-product" onSubmit={handleSubmit}>
      <div className="add-product">
        <div className="content">
          <div className="header">
            <button type="button" onClick={closeForm}>X</button>
            <h3>Formulaire d'ajout d'un nouveau composant</h3>
          </div>
          <div className="component">
            <div className="img">
              {imagePreview
                ? <img src={imagePreview} alt="Preview" onClick={handleImageClick} />
                : <img src="src/assets/add-image.svg" alt="Add image" onClick={handleImageClick} />}
              <input type="file" accept=".jpg, .jpeg, .png" ref={imageRef} onChange={handleFileChange} hidden />
              <p>{errorImage ? errorImage : ""}</p>
            </div>
            <div className="input">
              <div className="field-input">
                <label htmlFor="name">Nom du composant</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Saisissez le nom" />
                <p>{errorName ? errorName : ""}</p>
              </div>
              <div className="field-input">
                <label htmlFor="type">Type du composant</label>
                <select name="type" id="type" onChange={(e) => setTypeSelected(e.target.value)}>
                  <option value="motor">Motor</option>
                  <option value="capteur">Capteur</option>
                  <option value="file">File</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="info">
              <div className="field-input">
                <label htmlFor="price">Prix: </label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value >= 0 ? parseInt(e.target.value) : price)} />
                <select name="device">
                  <option value="$">$</option>
                  <option value="CDF">CDF</option>
                </select>
              </div>
              <div className="field-input">
                <label htmlFor="quantity">Quantité: </label>
                <button type="button" id="quantity" onClick={() => setQuantity((e) => (e > 1 ? e - 1 : e))}>&lt;</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value >= 0 ? parseInt(e.target.value) : quantity)} />
                <button type="button" onClick={() => setQuantity((e) => (e + 1))}>&gt;</button>
              </div>
            </div>
            <p>{errorMessage ? errorMessage : ""}</p>
          </div>
          <ButtonAdd child="Confirmer" type="submit" />
        </div>
      </div>
    </form>
  )
}

export default AddProduct