import { Link } from "react-router-dom";



// eslint-disable-next-line react/prop-types
const TableRow = ({ no, id, title, contents, writer, reg_date }) => {

    return (
        <tr>
            <td>{no}</td>
            <td><Link to={`/view/${id}`}>{title}</Link></td>
            <td>{writer}</td>
            <td>{new Date(reg_date).toLocaleString()}</td>
        </tr>
    );

}

export default TableRow;