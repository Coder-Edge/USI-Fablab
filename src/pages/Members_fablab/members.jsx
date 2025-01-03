import React, { useEffect, useState } from "react";


function Membres() {
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
            <div style={{display : "block"}}>
            {
               user.map(u => (
                <p key={u._id}>{u.name} : {u.userType}</p>
              )) 
            }
            </div>
        </>
    )
}

export default Membres