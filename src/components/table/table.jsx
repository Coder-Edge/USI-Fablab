import './table.css'

const DynamicTable = ({theadChild, tbodyChild}) => {
    return (
        <div className="table">
            <table>
                <thead>
                    {theadChild}
                </thead>
                <tbody>
                    {tbodyChild}
                </tbody>
            </table>
        </div>
    )
}

export default DynamicTable