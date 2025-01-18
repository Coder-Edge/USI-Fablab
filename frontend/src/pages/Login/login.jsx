import { useNavigate } from "react-router-dom"
import axios from "../../api/api"


const LoginForm = () => {
    const navigate = useNavigate()

    const login = async (data) => {
        
        await axios.post("/users/login", data)
        .then(async (res) => {
            const type = res.data.user.userType.toLowerCase()
            navigate(`/${type}`)
        }).catch((error) => {
            console.log(error.response.data.message);
        }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData(e.target)
        let data = {email: formData.get("email"), password: formData.get("password")}
        login(data)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"/> <br />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" /><br />
            <button type="submit">Se connecter</button>
        </form>
    )
}

export default LoginForm