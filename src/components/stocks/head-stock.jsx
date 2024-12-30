
import { IoSearchOutline } from "react-icons/io5";

const HeadStocks = ({title, setSearchTerm}) => {

    // Search
    const handleSearchTerm = (e) => {
        let value = e.target.value.toLowerCase()
        setSearchTerm(value)
    }


    return (
        <div className="head">
            <h2>{title}</h2>
            <div className="search">
                <IoSearchOutline className="icon" />
                <input type="search" placeholder="Recherche" onChange={handleSearchTerm} />
            </div>
        </div>
    )
}

export default HeadStocks