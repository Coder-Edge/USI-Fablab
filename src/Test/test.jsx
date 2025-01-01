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
            {
                items.map(i => (
                    <p>t</p>
                ))
            }

{
                items.map(i => (
                    <p>t</p>
                ))
            }
        </>
    )
}

export default App