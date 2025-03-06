import ButtonAdd from "../stocks/button-add";
import "./add-member.css";
import { IoMdClose } from "react-icons/io";
import axios from "../../api/api";
import Swal from 'sweetalert2';

const AddMember = () => {

  const sendData = async (data) => {
    await axios
      .post("/add_member", data)
      .then((res) => {
        console.log(res);
        Swal.fire("Reussi !",res.data.message, "success");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Erreur", err.response.data.message, "error");

      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      poste: formData.get("poste"),
      salary: formData.get("salary"),
      device: formData.get("device"),
    };

    sendData(data);
    closePopup();
    console.log(data);
  };

  const closePopup = () => {
    document.querySelector("#add-member").style.visibility = "hidden";
  };

  return (
    <form id="add-member" onSubmit={onSubmit}>
      <div className="add-popup">
        <div className="add-member-content">
          <div className="header">
            <button type="button" onClick={closePopup}>
              <IoMdClose />
            </button>
            <h3>Formulaire d'invitation d'un nouveau composant</h3>
          </div>
          <div className="add-member-form-content">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="saisissez l'email du nouveau membre"
                name="email"
              />
            </div>
            <div className="input-field">
              <label htmlFor="poste">Poste</label>
              <select id="poste" name="poste">
                <option value="Gestionnaire de project">
                  Gestionnaire de project
                </option>
                <option value="Gestionnaire des imprimantes 3D">
                  Gestionnaire des imprimantes 3D
                </option>
              </select>
            </div>
            <div className="input-field pay">
              <label htmlFor="salary" style={{ whiteSpace: "nowrap" }}>
                Salaire :
              </label>
              <input type="number" id="salary" name="salary" defaultValue={0} />
              <select name="device">
                <option value="$">$</option>
                <option value="CDF">CDF</option>
              </select>
            </div>
            <ButtonAdd child={<>+Envoyer</>} type={"submit"} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddMember;
