import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md"
import { RiTimeLine } from "react-icons/ri"
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { BsCheck2Square } from "react-icons/bs";

const CommandStatus = (status, id) => {

    const status_data = {
        waiting: "en attente",
        accepted: "accepté",
        cancelled: "rejeté",
        inProgress: "en cours",
        done: "terminé"
    }
    const waitingIncon = { icon: <FaRegHourglassHalf size={16} fill="orange" />, Text: status_data.waiting, action: "Mettre en attente" }
    const acceptedIcon = { icon: <IoIosCheckmarkCircleOutline size={16} fill="green" />, Text: status_data.accepted, action: "Accepter", url: `/borrows/${id}/accept` }
    const cancelledIcon = { icon: <MdOutlineCancel size={16} fill="red" />, Text: status_data.cancelled, action: "Réjecter", url: `/borrows/${id}/reject` }
    const inProgressIcon = { icon: <RiTimeLine size={16} fill="blue" />, Text: status_data.inProgress, action: "Mettre en cours" }
    const doneIcon = { icon: <BsCheck2Square size={16} fill="purple" />, Text: status_data.done, action: "Terminer", url: `/borrows/${id}/done` }
    const unknownIcon = { icon: <AiOutlineQuestionCircle size={16} fill="gray" />, Text: "Inconnue", action: "Inconnue" }

    const listIcons = [
        acceptedIcon,
        cancelledIcon,
        doneIcon
    ];

    const actionsIcon = (excludedIndex) => listIcons.filter((icon, index) => (
        excludedIndex.includes(index) === false
    ))

    switch (status) {
        case status_data.waiting:
            return {
                main: <div className="status-icon waiting">
                    {waitingIncon.icon}{waitingIncon.Text}
                </div>,
                actions: actionsIcon([2])
            } // waiting
        case status_data.accepted:
            return {
                main: <div className="status-icon accepted">
                    {acceptedIcon.icon}{acceptedIcon.Text}
                </div>,
                actions: actionsIcon([0, 1])
            } // accepted
        case status_data.cancelled:
            return {
                main: <div className="status-icon cancelled">
                    {cancelledIcon.icon}{cancelledIcon.Text}
                </div>,
                actions: actionsIcon([0, 1, 2])
            } // cancelled
        case status_data.inProgress:
            return {
                main: <div className="status-icon in-progress">
                    {inProgressIcon.icon}{inProgressIcon.Text}
                </div>,
                actions: actionsIcon([3])
            }// in progress
        case status_data.done:
            return {
                main: <div className="status-icon done">
                    {doneIcon.icon}{doneIcon.Text}
                </div>,
                actions: actionsIcon([0, 1, 2])
            } // done
        default:
            return {
                main: <div className="status-icon unknown">
                    {unknownIcon.icon}{unknownIcon.Text}
                </div>,
                actions: []
            } // unknown status
    }
}

export default CommandStatus;