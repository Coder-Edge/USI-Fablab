import "./detail-article.css"
import Button from "../../../components/button/Button"
import ButtonAdd from "../../../components/stocks/button-add"
import { MdAddCircleOutline } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

const DetailArticle = () => {

    // get id of the product
    const { id } = useParams()

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

    return (
        <div className="detail-art">
            <div className="product-detail-view-content">
                <div className="product-detail-body">
                    <div className="images">
                        <div className="image-view" style={{
                            backgroundImage: `url(http://localhost:3000/img/${showImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}>
                            <div className="slide-button">
                                <button type="button"
                                    onClick={decreaseImageIndex}
                                    disabled={listImages.indexOf(showImage) <= 0}>&lt;</button>
                                <button type="button"
                                    disabled={listImages.indexOf(showImage) + 1 >= listImages.length}
                                    onClick={increaseImageIndex}>&gt;</button>
                            </div>
                        </div>
                        <div className="other-view">
                            {listImages.map(
                                (img, index) => (
                                    <div key={index} className={`img ${showImage === img ? "active" : ""}`}
                                        onClick={() => { deleteImage(img) }}
                                        style={{
                                            backgroundImage: `url(http://localhost:3000/img/${img})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}></div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="product-info">
                        <p>Catty cat</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum dolorum magnam ipsam. Pariatur quos nobis officiis dolor perspiciatis ipsum, hic in, corporis earum labore magnam voluptatibus distinctio voluptatum eius? Vitae ut architecto eum libero? Reprehenderit debitis nulla, ad odio voluptates molestias saepe quidem iure aperiam quos laboriosam nisi minus. Dolores?</p>
                        <div className="fees">
                            <span className="price">$ 30,00</span>
                            <span className="fees-text">Frais de livaison : <span className="amount">$ 5,00</span></span>
                        </div>
                        <div className="cotation">
                            <span className="evaluation">50 évaluateurs</span>
                            <span className="quantity">Quantité : <button>&lt;</button><input type="text" readOnly value={5} /><button>&gt;</button></span>
                        </div>
                        <div className="total-fees">
                            <span className="fees-text">Coût total de la commande</span>
                            <span className="price">$ 30,00</span>
                        </div>
                        <div className="footer">
                            <Button child={"Annuler"} type={"button"} />
                            <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} type={"submit"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailArticle