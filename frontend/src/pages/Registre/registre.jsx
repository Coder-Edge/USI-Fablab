import React, { useState } from "react";
import axios from "../../api/api"
import ButtonAdd from "../../components/stocks/button-add";
import Role from "../../api/roles";
import { useNavigate } from "react-router-dom";


function UserForm() {

  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [userType, setType] = useState(Role.student)
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")

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

    setConfPassword("")
    setPassword("")
    setLoading(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) setEmailErr("*ce champ doit être remplis")
    else setEmailErr("")
    if (!password) setPasswordErr("*ce champ doit être remplis")
    else setPasswordErr("")
    if (!name) setNameErr("*ce champ doit être remplis")
    else setNameErr("")

    if (email && password && confPassword && name && (confPassword === password)) {
      insertUsers({ email, name, userType, password });
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h3>S'ENREGISTRER</h3>
        {errorMsg ? <p className="error">{errorMsg}</p> : null}
        <div className="input-fields">
          <label htmlFor="name">Nom d'utilisateur</label><br />
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {emailErr ? <p>{nameErr}</p> : null}
        </div>
        <div className="input-fields">
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            type="email"
            name="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr ? <p>{passwordErr}</p> : null}
        </div>
        <div className="input-fields">
          <label htmlFor="confpassword">Confirmation du mot de passe</label><br />
          <input
            id="confpassword"
            type="password"
            name="confpassword"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          {password === confPassword
            ? null
            : <p>*Cette value doit correspondre au mot de passe</p>}
        </div>
        <div className="input-fields">
          <label htmlFor="type">Profession à l'ULC</label><br />
          <select
            id="type"
            name="userType"
            value={userType}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={Role.student}>Etudiant</option>
            <option value={Role.extern}>Personne exterieure</option>
            <option value={Role.manager}>Manager</option>
          </select>
        </div>
        <p>Avez-vous un compte? <a href="/login">Se connecter</a></p>
        <ButtonAdd
          child={!loading ? "S'enregistrer" : "En cour ..."}
          className={!loading ? "" : "disable"} />
      </form>
    </div>
  );
}
export default UserForm;
