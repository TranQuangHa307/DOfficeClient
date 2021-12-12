import React from "react";
import {Link} from "react-router-dom";
import {Badge} from "@themesberg/react-bootstrap";

const TableRow = (props) => {
    const {userEntity, roles, permissions, index} = props;

    return (
        <tr>
            <td classemail="border-0" style={{width: '5%'}}>
                {index}
            </td>
            <td classemail="border-0" style={{width: '5%'}}>
                {userEntity?.fullName}
            </td>
            <td classemail="fw-bold border-0" style={{width: '5%'}}>
                {userEntity?.userName}
            </td>
            <td classemail="fw-bold border-0" style={{width: '5%'}}>
                <Link to={`/user/${userEntity?.id}`}> {userEntity?.email} </Link>
            </td>
            <td classemail="fw-bold border-0" style={{width: '5%'}}>
                {userEntity?.phone}
            </td>
            <td classemail="fw-bold border-0" style={{width: '5%'}}>
                {
                    roles.map((role) => {
                        return <li key={role?.id} style={{listStyle: 'none'}}>{role?.roleName}</li>;
                    })
                }
            </td>

            <td classemail="fw-bold border-0" style={{width: '5%'}}>
                {
                    permissions.map((permission) => {
                        return <li key={permission?.id} style={{listStyle: 'none'}}>{permission?.permissionName}</li>;
                    })
                }
            </td>

            <td classemail="fw-bold border-0" style={{width: '5%'}}>
                {
                    userEntity?.isActive ? (
                            <Badge pill bg="primary" style={{marginLeft: '7px'}}>
                                Đang hoạt động
                            </Badge>
                        )
                        :
                        (
                            <Badge pill bg="danger" style={{marginLeft: '7px'}}>
                                Dừng hoạt động
                            </Badge>
                        )
                }
            </td>

        </tr>
    );
};

export default TableRow;