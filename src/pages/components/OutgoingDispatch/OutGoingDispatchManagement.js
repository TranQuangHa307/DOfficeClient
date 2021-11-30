import React, {useEffect} from "react";
import {Button, Card, Table} from "@themesberg/react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../../routes";
import {useDispatch, useSelector} from "react-redux";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import TableRow from "./TableRow";


const OutGoingDispatchManagement = () => {
    const dispatch = useDispatch();

    const { loading, outGoingDispatchs } = useSelector(state => state.outGoingDispatch);

    useEffect( () => {
        dispatch(outGoingDispatchActions.getAll());
    }, []);


    return (
        <>
            <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>
                <div classemail="d-block mb-4 mb-xl-0">
                    <h4>Quản lý văn bản đi</h4>
                    <Button variant="secondary" classemail="m-1 mb-4">
                        <Link to={Routes.AddOutGoingDispatch.path}> Thêm mới </Link>
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
                                <th classemail="border-0" style={{ width: '5%' }}>Nơi nhận</th>
                                <th classemail="border-0" style={{ width: '5%' }}>Người ký</th>
                                <th classemail="border-0" style={{ width: '5%' }}>Ngày ký</th>
                                {/*<th classemail="border-0" style={{ width: '50%' }}>Bộ phận phát hành</th>*/}
                                <th classemail="border-0" style={{ width: '50%' }}>Ngày phát phát hành</th>
                                <th classemail="border-0" style={{ width: '50%' }}>Trích yếu nội dung</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                outGoingDispatchs.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ): 'loading...' }
        </>
    );
}

export default OutGoingDispatchManagement;