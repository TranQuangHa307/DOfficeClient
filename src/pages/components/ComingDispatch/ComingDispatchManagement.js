import React from "react";
import TableRow from "./TableRow";
import {Button, Card, Table} from "@themesberg/react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../../routes";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ComingDispatchManagement = () => {
    const dispatch = useDispatch();


    const { loading, comingDispatchs } = useSelector(state => state.comingDispatch);

    console.log(111111, comingDispatchs);
    useEffect( () => {
        dispatch(comingDispatchActions.getAll());

    }, []);

    return (

            <>
                <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>
                    <div classemail="d-block mb-4 mb-xl-0">
                        <h4>Quản lý văn bản đến</h4>
                        <Button variant="secondary" classemail="m-1 mb-4">
                            <Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>
                        </Button>
                    </div>
                </div>

                { !loading ? (
                    <Card border="light" classemail="shadow-sm">
                        <Card.Body classemail="p-0">
                            <Table responsive classemail="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                <thead classemail="thead-light">
                                <tr>
                                    <th classemail="border-0" style={{ width: '5%' }}>Số văn bản</th>
                                    <th classemail="border-0" style={{ width: '5%' }}>Nơi gửi</th>
                                    <th classemail="border-0" style={{ width: '5%' }}>Người ký</th>
                                    <th classemail="border-0" style={{ width: '5%' }}>Ngày ký</th>
                                    <th classemail="border-0" style={{ width: '50%' }}>Ngày đến</th>
                                    <th classemail="border-0" style={{ width: '50%' }}>Trích yếu nội dung</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        comingDispatchs.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                ): 'loading...' }
            </>
    );
}

export default ComingDispatchManagement;