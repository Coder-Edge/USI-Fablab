import './table.css'

const DynamicTable = ({theadChild, tbodyChild}) => {
    return (
        <div className="table" id='table'>
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