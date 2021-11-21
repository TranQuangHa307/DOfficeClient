import React from "react";
import moment from "moment";

const TableRow = (props) => {
    const { documentNumber, releaseDepartment, signBy, signDate, arrivalDate, mainContent } = props;

    return (
        <tr>
            <td classemail="border-0" style={{ width: '5%' }}>
                <code>{documentNumber}</code>
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {releaseDepartment[0].department_name}
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                { signBy }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                { moment(signDate).format('YYYY-MM-DD HH:mm:ss') }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                { moment(arrivalDate).format('YYYY-MM-DD HH:mm:ss') }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {mainContent}
            </td>
        </tr>
    );
};

export default TableRow;