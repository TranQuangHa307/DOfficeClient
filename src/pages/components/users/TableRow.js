import React from "react";
import {Link} from "react-router-dom";

const TableRow = (props) => {
    const { userEntity, roles, permissions, index } = props;

    return (
        <tr>
            <td classemail="border-0" style={{ width: '5%' }}>
                {index + 1}
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
                {userEntity?.fullName}
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                {userEntity?.userName}
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                <Link to={`/user/${userEntity?.id}`}> {userEntity?.email} </Link>
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                {userEntity?.phone}
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                {
                    roles.map((role) => {
                        return <li key={role?.id} style={{listStyle:'none'}}>{role?.roleName}</li>;
                    })
                }
            </td>

            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                {
                    permissions.map((permission) => {
                        return <li key={permission?.id} style={{listStyle:'none'}}>{permission?.permissionName}</li>;
                    })
                }
            </td>

            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                {
                    userEntity?.isActive ? 'Đang hoạt động' : 'Dừng hoạt động'
                }
            </td>

        </tr>
    );
};

export default TableRow;