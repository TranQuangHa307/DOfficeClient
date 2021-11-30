import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

const TableRow = (props) => {
    const { documentNumber, receiveAddress, signByUser, signDate, releaseDepartment, releaseDate, mainContent, id} = props;

    return (
        <tr>
            <td classemail="border-0" style={{ width: '5%' }}>
                <Link to={`/out-going-dispatch/${id}`}> {documentNumber} </Link>
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {receiveAddress}
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                { signByUser?.fullName }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                { moment(signDate).format('YYYY-MM-DD') }
            </td>
            {/*<td classemail="border-0" style={{ width: '5%' }}>*/}
            {/*    {releaseDepartment?.departmentName}*/}
            {/*</td>*/}
            <td classemail="border-0" style={{ width: '5%' }}>
                { moment(releaseDate).format('YYYY-MM-DD') }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {mainContent}
            </td>
        </tr>
    );
};

export default TableRow;