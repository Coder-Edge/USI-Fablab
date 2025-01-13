import "./borrow-form.css"
import { IoCloseSharp } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../button/Button"
import BorrowTable from "./table";
import ButtonAdd from "../stocks/button-add";
import { useContext, useRef } from "react";
import { BorrowContext } from "../../pages/student/inventory/inventory";

const BorrowForm = () => {

    // form Ref
    const formRef = useRef(null)

    // get parent data
    const {borrowList, setBorrowList} = useContext(BorrowContext)

    // default date
    let defaultDate = new Date(Date.now())

    // close form
    const closeForm = () => {document.querySelector('#borrow-form').style.visibility = "hidden"}
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const labelError = document.querySelector(".motif-invalid-label")
        const motifInput = e.target.querySelector("textarea")

        const formData = new FormData(e.target)
        let motif = formData.get("motif")
        let startDate = formData.get("start-date")
        let endtDate = formData.get("end-date")

        if (!motif.trim()) {
            motifInput.classList.add("invalid")
            labelError.style.visibility = "visible"
        } else {
            motifInput.classList.remove("invalid")
            labelError.style.visibility = "hidden"
            closeForm()
            console.log(motif, startDate, endtDate, borrowList);

            // reset data
            setBorrowList([])
            formRef.current.reset()
        }
    }

    return (
        <form method="post" id="borrow-form" onSubmit={handleSubmit} ref={formRef}>
            <div className="borrow-form">
                <div className="form-content">
                    <div className="head-form-borrow">
                        <Button child={<IoCloseSharp />} type={"button"} onClick={closeForm}/>
                        <h3>Formulaire d'emprunt</h3>
                    </div>
                    <div className="list-items-form-borrow">
                        <h3>Liste d'items</h3>
                        <BorrowTable />
                        <ButtonAdd child={<><MdAddCircleOutline /> Ajouter</>} type={"button"} onClick={closeForm} />
                    </div>
                    <div className="time-form-borrow">
                        <h3>Durée d'emprunt</h3>
                        <div className="time-content-form-borrow">
                            <div className="borrow-start-date">
                                <label htmlFor="start-date">Date d'emprunt</label>
                                <input
                                    type="date"
                                    name="start-date"
                                    id="start-date"
                                    defaultValue={`${defaultDate.getFullYear()}-${defaultDate.getMonth() + 1}-${defaultDate.getDate()}`}/>
                            </div>
                            <div className="borrow-end-date">
                                <label htmlFor="end-date">Date de restitution</label>
                                <input
                                    type="date"
                                    name="end-date"
                                    id="end-date"
                                    defaultValue={`${defaultDate.getFullYear()}-${defaultDate.getMonth() + 1}-${defaultDate.getDate()}`}/>
                            </div>
                        </div>
                    </div>
                    <div className="motif-form-borrow">
                        <h3>Motif d'emprunt</h3>
                        <textarea name="motif" placeholder="Decrivez votre project" id="motif"></textarea>
                        <label htmlFor="motif" className="motif-invalid-label">*Ce champ doit etre rempli</label>
                        <ButtonAdd 
                            child={"Terminer"} 
                            type="submit"/>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BorrowForm