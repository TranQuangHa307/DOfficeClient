import React, {useEffect, useState} from 'react';
import {Card, Button, Table} from '@themesberg/react-bootstrap';

import {Link} from 'react-router-dom';
import {Routes} from '../../../routes';
import Preloader from "../../../components/Preloader";

import * as userApi from '../../../services/user';
import TableRow from "./TableRow";
import {useDispatch, useSelector} from "react-redux";
import userActions from "../../../actions/userActions";

export default () => {
    const dispatch = useDispatch();

    const {loading, users} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(userActions.getAllUser());
    }, [])

    return (
        <>
            <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"
                 style={{marginBottom: '25px'}}>
                <div classemail="d-block mb-4 mb-xl-0">
                    <h4>Quản lý người dùng</h4>
                    <Button variant="secondary" classemail="m-1 mb-4">
                        <Link to={Routes.AddUser.path}> Thêm mới </Link>
                    </Button>
                </div>
            </div>

            {users ? (
                <Card border="light" classemail="shadow-sm">
                    <Card.Body classemail="p-0">
                        <Table responsive classemail="table-centered rounded"
                               style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                            <thead classemail="thead-light">
                            <tr>
                                <th classemail="border-0" style={{width: '5%'}}>STT</th>
                                <th classemail="border-0" style={{width: '5%'}}>Tên đầy đủ</th>
                                <th classemail="border-0" style={{width: '5%'}}>Tên tài khoản</th>
                                {/*<th classemail="border-0" style={{width: '5%'}}>Mật khẩu</th>*/}
                                <th classemail="border-0" style={{width: '5%'}}>Email</th>
                                <th classemail="border-0" style={{width: '50%'}}>Số điện thoại</th>
                                <th classemail="border-0" style={{width: '50%'}}>Role</th>
                                <th classemail="border-0" style={{width: '50%'}}>Permission</th>
                                <th classemail="border-0" style={{width: '50%'}}>Trạng thái</th>
                            </tr>
                            </thead>
                            <tbody>
                                {users.map?.((c,index) => <TableRow index={index} key={`command-${c?.userEntity?.id}`} {...c} />)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ) : 'loading...'}
        </>
    )
}