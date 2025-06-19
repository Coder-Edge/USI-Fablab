import "./cards.css"

const ProductCard = ({product, showDetail}) => {
    
    return (
        <div className="product-card" onClick={showDetail}>
            <div className="image"
                style={{
                    backgroundImage: `url(http://localhost:3000/img/${product.image[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}>
                </div>
            <div className="product-desc">
                <p>{product.name}</p>
                <div className="product-info">
                    <span className="price">{product.price}$</span>
                    <span className="rate">
                        <img src="/src/assets/icon/rate.svg" alt="rate" />
                        {product.rate}
                    </span>
                </div>
            </div>
            <div className="like">
                <img src="/src/assets/icon/like.svg" alt="" />
            </div>
        </div>
    )
}

export default ProductCard