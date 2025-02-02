import { useNavigate } from "react-router-dom"
import axios from "../../api/api"
import ButtonAdd from "../../components/stocks/button-add"
import "./login.css"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
import Button from "../../components/button/Button"


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
                    setErrorMsg("Le serveur ne repond pas")
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
                <div className="sidediv"></div>
                <div className="form-content">
                    <h3>SE CONNECTER</h3>
                    {errorMsg ? <p className="error">{errorMsg}</p> : null}
                    <div className="input-fields">
                        <label htmlFor="email">Email</label><br />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre adresse email" />
                        {emailErr ? <p>{emailErr}</p> : null}
                    </div>
                    <div className="input-fields">
                        <label htmlFor="password">Mot de passe</label><br />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Votre mot de passe" />
                        {passwordErr ? <p>{passwordErr}</p> : null}
                    </div>
                    <div className="input-fields more">
                        <div className="remind">
                            <input type="checkbox" name="remind" id="remind" />
                            <label htmlFor="remind">Se souvenir de moi</label>
                        </div>
                        <a href="#">Mot de passe oublié</a>
                    </div>
                    <ButtonAdd
                        child={!loading ? "Se connecter" : "En cour ..."}
                        className={!loading ? "" : "disable"} />
                        
                    <Button child={<><FcGoogle/> Se connecter via Google</>} className={"google"} type={"button"}/>
                    <p>Pas de compte? / <a href="/register">S'inscrire</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm