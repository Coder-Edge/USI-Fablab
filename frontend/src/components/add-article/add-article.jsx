import Button from "../button/Button"
import ButtonAdd from "../stocks/button-add"
import { MdAddCircleOutline } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { useEffect, useRef, useState } from "react"
import "./add-article.css"

const AddArticle = ({ articles, receivedTypes, state }) => {

    // close form
    const closeForm = () => document.querySelector("#add-article").style.visibility = "hidden"

    let imgRef = useRef();

    const [types, setTypes] = useState([])

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState("")
    const [device, setDevice] = useState("")
    const [showImage, setShowImage] = useState("")
    const [listImages, setListImages] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        setTypes(receivedTypes);
        setType(receivedTypes ? receivedTypes[0] : "");
        setName("");
        setPrice(0);
        setQuantity(0);
        setDescription("");
        setDevice("");
        setListImages([])
        setShowImage("");

    }, [state])

    useEffect(() => {
        setShowImage(listImages[0])
    }, [listImages])

    const increaseImageIndex = () => {
        const index = listImages.indexOf(showImage) + 1
        setShowImage(listImages[index])
    }

    const decreaseImageIndex = () => {
        const index = listImages.indexOf(showImage) - 1
        setShowImage(listImages[index])
    }

    const handleImageSelection = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImages(prev => [...prev, file])
            setListImages(prev => [...prev, URL.createObjectURL(file)])
        }
    }

    const deleteImage = (imageUrl) => {
        setListImages((listImages.filter(url => url !== imageUrl)))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append("name", name);
        formData.append("type", type);
        formData.append("quantity", quantity);
        formData.append("device", device);
        formData.append("description", description);
        formData.append("imagesUrls", listImages);
        formData.append("newImages", images);

        closeForm()
    }

    return (
        <form id="add-article" onSubmit={handleSubmit}>
            <div className="product-detail-view-content">
                <div className="header">
                    <button type="button" onClick={closeForm}><IoMdClose /></button>
                    <h3>Formulaire de modification de produit</h3>
                </div>
                <div className="product-detail-body">
                    <div className="images">
                        <div className="image-view" style={{
                            backgroundImage: `url(${showImage ? showImage : "/src/assets/add-image.svg"})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}>
                            {
                                showImage
                                    ? <div className="slide-button">
                                        <button type="button"
                                            onClick={decreaseImageIndex}
                                            disabled={listImages.indexOf(showImage) <= 0}>&lt;</button>
                                        <button type="button"
                                            disabled={listImages.indexOf(showImage) + 1 >= listImages.length}
                                            onClick={increaseImageIndex}>&gt;</button>
                                    </div>
                                    : null
                            }
                        </div>
                        <div className="other-view">

                            <div className="li-image">
                                <input type="file" accept=".jpg, .jpeg, .png, .gif"
                                    hidden id="image" ref={imgRef} onChange={handleImageSelection} />
                                <div className={`img ${showImage === listImages[0] && listImages[0] ? "active" : ""}`} style={{
                                    backgroundImage: `url(${listImages[0] ? listImages[0] : "/src/assets/add-image.svg"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                                    onClick={() => listImages[0] ? {} : imgRef.current.click()}></div>
                                {listImages[0]
                                    ? <div className="close" onClick={() => deleteImage(listImages[0])}><IoMdClose /></div>
                                    : null
                                }
                            </div>
                            <div className="li-image">
                                <input type="file" accept=".jpg, .jpeg, .png, .gif"
                                    hidden id="image" ref={imgRef} onChange={handleImageSelection} />
                                <div className={`img ${showImage === listImages[1] && listImages[1] ? "active" : ""}`} style={{
                                    backgroundImage: `url(${listImages[1] ? listImages[1] : "/src/assets/add-image.svg"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                                    onClick={() => listImages[1] ? {} : imgRef.current.click()}></div>
                                {listImages[1]
                                    ? <div className="close" onClick={() => deleteImage(listImages[1])}><IoMdClose /></div>
                                    : null
                                }
                            </div>
                            <div className="li-image">
                                <input type="file" accept=".jpg, .jpeg, .png, .gif"
                                    hidden id="image" ref={imgRef} onChange={handleImageSelection} />
                                <div className={`img ${showImage === listImages[2] && listImages[2] ? "active" : ""}`} style={{
                                    backgroundImage: `url(${listImages[2] ? listImages[2] : "/src/assets/add-image.svg"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                                    onClick={() => listImages[2] ? {} : imgRef.current.click()}></div>
                                {listImages[2]
                                    ? <div className="close" onClick={() => deleteImage(listImages[2])}><IoMdClose /></div>
                                    : null
                                }
                            </div>
                            <div className="li-image">
                                <input type="file" accept=".jpg, .jpeg, .png, .gif"
                                    hidden id="image" ref={imgRef} onChange={handleImageSelection} />
                                <div className={`img ${showImage === listImages[3] && listImages[3] ? "active" : ""}`} style={{
                                    backgroundImage: `url(${listImages[3] ? listImages[3] : "/src/assets/add-image.svg"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                                    onClick={() => listImages[3] ? {} : imgRef.current.click()}></div>
                                {listImages[3]
                                    ? <div className="close" onClick={() => deleteImage(listImages[3])}><IoMdClose /></div>
                                    : null
                                }
                            </div>

                        </div>
                    </div>
                    <div className="product-info">
                        <div className="input-field">
                            <label htmlFor="name">Nom du produit</label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="type">Type de produit</label>
                            <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                {types.map(
                                    (t, index) => {
                                        return (<option value={t} key={index}>{t}</option>)
                                    }
                                )}
                            </select>
                        </div>
                        <div className="pay">
                            <div className="input-field">
                                <label htmlFor="price">Prix: </label>
                                <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <select name="device" id="device" value={device} onChange={(e) => setDevice(e.target.value)}>
                                    <option value="$">$</option>
                                    <option value="CDF">CDF</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <label htmlFor="quantity">Quantité: </label>
                                <button type="button">&lt;</button>
                                <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                <button type="button">&gt;</button>
                            </div>
                        </div>
                        <div className="input-field desc">
                            <label htmlFor="description">Description du produit </label>
                            <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Button child={"Annuler"} type={"button"} onClick={closeForm} />
                    <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} type={"submit"} />
                </div>
            </div>
        </form>
    )
}

export default AddArticle