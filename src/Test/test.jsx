import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";


function App() {
    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchData = async() => {
        const res = await fetch("http://localhost:3000")
        const data = await res.json()
        console.log(data)
        setItems(data.items)
        }
        fetchData();
    },[])
    return(
        <>
            <div style={{display : "block"}}>
            {
               items.map(item => (
                <p key={item._id}>{item.name}, {item.description}</p>
              )) 
            }
            </div>
        </>
    )
}

export default App