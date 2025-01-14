import React, { useEffect, useState } from "react";


function Appusers() {
    const [user, setItems] = useState([])
    useEffect(() => {
        const fetchData = async() => {
        const res = await fetch("http://localhost:3000/users/")
        const data = await res.json()
        console.log(data)
        setItems(data.user)
        }
        fetchData();
    },[])
    return(
        <>
            
        </>
    )
}

export default Appusers