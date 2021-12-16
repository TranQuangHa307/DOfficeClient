import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

const TableRow = (props) => {
    const { documentNumber, releaseDepartment, signBy, signDate, arrivalDate, mainContent, id } = props;

    return (
        <tr>
            <td classemail="border-0">
                <Link to={`/coming-dispatch/${id}`}> {documentNumber} </Link>
            </td>
            <td classemail="border-0">
                {releaseDepartment.departmentName}
            </td>
            <td classemail="fw-bold border-0">
                { signBy }
            </td>
            <td classemail="border-0">
                { moment(signDate).format('YYYY-MM-DD') }
            </td>
            <td classemail="border-0">
                { moment(arrivalDate).format('YYYY-MM-DD') }
            </td>
            <td classemail="border-0" >
                <div className="cellEllipsis" style={{width: '300px'}}>
                    {mainContent}
                </div>
            </td>
        </tr>
    );
};

export default TableRow;