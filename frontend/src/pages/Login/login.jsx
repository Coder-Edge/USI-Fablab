import { useNavigate } from "react-router-dom"
import axios from "../../api/api"


const LoginForm = () => {
    const navigate = useNavigate()
    let from = location.state?.from?.pathname

    const login = async (data) => {
        console.log(data);
        
        await axios.post("/users/login", data, {withCredentials: true})
        .then(async (res) => {
            console.log(res.data.accessToken);
        
            if (res.data.isvalid) {
                setAuth({email: data.email, accessToken: res.data.accessToken, role: res.data.type})
                switch (res.data.type) {
                    case "Extern":                        
                        from = from || "/extern"
                        break;

                    case "Member":  
                        from = from || "/member"                      
                        break;

                    case "Manager": 
                        from = from || "/manager"                       
                        break;

                    case "Student":  
                        from = from || "/student"                      
                        break;
                
                }
                console.log(from);
                
                navigate(from, {replace: true})
            }
        }).catch((error) => {
            console.log(error);
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