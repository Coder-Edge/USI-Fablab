import { useNavigate } from "react-router-dom"
import axios from "../../api/api"
import ButtonAdd from "../../components/stocks/button-add"
import "./login.css"
import { useState } from "react"


const LoginForm = () => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setLoading(true)
        await axios.post("/users/login", data)
            .then(async (res) => {
                const type = res.data.user.userType.toLowerCase()
                navigate(`/${type}`)
            }).catch((error) => {
                if (error.code === 'ERR_NETWORK') {
                    setErrorMsg("Une erreur se produit lors de la connection")
                } else {    
                    setErrorMsg(error.response.data.message)
                }
            })
        setPassword("")
        setLoading(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) setEmailErr("*ce champ doit être remplis")
        else setEmailErr("")
        if (!password) setPasswordErr("*ce champ doit être remplis")
        else setPasswordErr("")

        if (email && password) {
            setEmailErr("")
            setPasswordErr("")
            let data = { email, password }
            login(data)
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h3>SE CONNECTER</h3>
                {errorMsg ? <p className="error">{errorMsg}</p> : null}
                <div className="input-fields">
                    <label htmlFor="email">Email</label><br />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Saisissez votre email" />
                    {emailErr ? <p>{emailErr}</p> : null}
                </div>
                <div className="input-fields">
                    <label htmlFor="password">Mot de passe</label><br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Saissisez votre mot de passe" />
                    {passwordErr ? <p>{passwordErr}</p> : null}
                </div>
                <p>Pas de compte? <a href="/register">S'enregistrer</a></p>
                <ButtonAdd
                    child={!loading ? "Se connecter" : "En cour ..."}
                    className={!loading ? "" : "disable"} />
            </form>
        </div>
    )
}

export default LoginForm