import React, { useState } from "react";
import axios from "../../api/api"
import ButtonAdd from "../../components/stocks/button-add";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";


function UserForm() {

  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [conditionsAccepted, setConditionsAccepted] = useState(false);

  const [loading, setLoading] = useState(false)

  const insertUsers = async (users) => {
    setLoading(true)
    await axios.post("/users/registre/", users)
      .then((res) => {
        setErrorMsg("")
        navigate("/login")
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") setErrorMsg("Le serveur ne repond pas")
        else setErrorMsg(err.response.data.message)
      })
    setPassword("")
    setLoading(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) setEmailErr("*ce champ doit être remplis")
    else setEmailErr("")
    if (!password) setPasswordErr("*ce champ doit être remplis")
    else setPasswordErr("")
    if (!name || !firstName) setNameErr("*ces champs doivent être remplis")
    else setNameErr("")

    if (email && password && firstName && name) {
      insertUsers({ email, name, password });
    }
  };  

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="sidediv"></div>
        <div className="form-content">
          <h3>INSCRIPTION</h3>
          {errorMsg ? <p className="error">{errorMsg}</p> : null}
          <div className="input-fields header">
            <div>
              <div>
                <label htmlFor="first-name">Prénom</label><br />
                <input
                  id="first-name"
                  type="text"
                  name="first-name"
                  placeholder="Votre prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name">Nom</label><br />
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {nameErr ? <p>{nameErr}</p> : null}
          </div>
          <div className="input-fields">
            <label htmlFor="email">Email</label><br />
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailErr ? <p>{emailErr}</p> : null}
          </div>
          <div className="input-fields">
            <label htmlFor="password">Mot de passe</label><br />
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErr ? <p>{passwordErr}</p> : null}
          </div>
          <div className="input-fields more">
            <div className="remind">
              <input
                type="checkbox"
                name="remind"
                id="remind"
                value={conditionsAccepted} 
                onChange={() => setConditionsAccepted(!conditionsAccepted)}/>
              <label htmlFor="remind">J'accepte <a>les conditions d'utilisation</a></label>
            </div>
            <div></div>
          </div>
          <ButtonAdd
            child={!loading ? "S'enregistrer" : "En cour ..."}
            className={(!loading && conditionsAccepted) ? "" : "disable"} />
          <Button child={<><FcGoogle /> S'inscrire via Google</>} className={"google"} type={"button"} />
          <p>Avez-vous un compte? / <a href="/login">Se connecter</a></p>
        </div>
      </form>
    </div>
  );
}
export default UserForm;
