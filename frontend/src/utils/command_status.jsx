import { FaRegHourglassHalf } from "react-icons/fa6"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md"

const CommandStatus = (status, id) => {

    const status_data = {
        waiting: "en attente",
        accepted: "accepté",
        cancelled: "rejeté",
    }

    const waitingIncon = { icon: <FaRegHourglassHalf size={16} fill="orange" />, Text: status_data.waiting, action: "Mettre en attente" }
    const acceptedIcon = { icon: <IoIosCheckmarkCircleOutline size={16} fill="green" />, Text: status_data.accepted, action: "Accepter", url: `/command/accept/${id}t` }
    const cancelledIcon = { icon: <MdOutlineCancel size={16} fill="red" />, Text: status_data.cancelled, action: "Réjecter", url: `/command/reject/${id}` }
    const deleteIcon = {icon: <MdDeleteOutline size={16} fill="#5899DD" />, url: `/delete_command/${id}`, action: "Supprimer"}

    const listIcons = [
        acceptedIcon,
        cancelledIcon,
        deleteIcon
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
                actions: actionsIcon([])
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
                actions: actionsIcon([0, 1])
            } // cancelled
        default:
            return {
                main: <div className="status-icon unknown">
                    {unknownIcon.icon}{unknownIcon.Text}
                </div>,
                actions: []
            } // unknown status
    }
}

export default CommandStatus