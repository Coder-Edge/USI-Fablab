import axios from "../../api/api"


export default async function logout() {
    await axios.post("/users/logout", {})
    .then((res) => {
        return true  
    })
    .catch((err) => {
        console.log(err.response.data.message)
        return false
    })
}