import React, {useEffect, useState} from "react";
import {Badge, Button, Card, Form, Spinner, Table} from "@themesberg/react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {Routes} from "../../../routes";
import {useDispatch, useSelector} from "react-redux";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import TableRow from "./TableRow";
import Pagination from 'react-bootstrap-4-pagination';

const OutGoingDispatchManagement = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatchStatus = searchParams.get('status');
    const {loading, outGoingDispatchs} = useSelector(state => state.outGoingDispatch);
    const [data, setData] = useState({
        page: 1,
        pageSize: 5,
    });
    const [isInit, setIsInit] = useState(false);
    const [paginationConfig, setPaginationConfig] = useState({});
    const [configTemp, setConfigTemp] = useState({
        size: "md",
    });

    const pageOnclick = (page) => {
        setData({
            ...data,
            page: page,
        })
    }

    const onChangePageSize = (e) => {
        setData({
            page: 1,
            pageSize: parseInt(e.target.value),
        });
    }

    useEffect(() => {
        console.log(111111111, dispatchStatus);
        dispatch(outGoingDispatchActions.getAll({
            page: data.page - 1,
            pageSize: data.pageSize,
            status: dispatchStatus ? dispatchStatus.toString() : null,
        }))
            .then((result) => {
                if (!isInit) {
                    setIsInit(true);
                }
                setPaginationConfig({
                    ...configTemp,
                    totalPages: Math.ceil(result?.total / data.pageSize),
                    currentPage: data.page,
                })
            });
    }, [data, dispatchStatus]);

    const renderStatusLabel = () => {
        if (dispatchStatus) {
            if (dispatchStatus.toString() === '1') {
                return (
                    <>
                        <p>
                            Trạng thái:
                            <Badge pill bg="danger" style={{marginLeft: '7px'}}>
                                Chưa xử lý
                            </Badge>
                        </p>
                    </>
                )
            }
            if (dispatchStatus.toString() === '2') {
                return (
                    <>
                        <p>
                            Trạng thái:
                            <Badge pill bg="primary" style={{marginLeft: '7px'}}>
                                Đã xử lý
                            </Badge>
                        </p>
                    </>
                )
            }
            if (dispatchStatus.toString() === '3') {
                return <p>Trạng thái: Chờ lãnh đạo đơn vị ký</p>
            }
            if (dispatchStatus.toString() === '4') {
                return <p>Trạng thái: Chờ lãnh đạo cơ quan ký</p>
            }
        } else {
            return (
                <>
                    <p style={{marginBottom: '45px'}}></p>
                </>
            )
        }
    }

    return (
        <>
            <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div classemail="d-block mb-4 mb-xl-0">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <h4>Quản lý văn bản đi</h4>
                            {
                                renderStatusLabel()
                            }
                        </div>
                        <div style={{marginTop: '14px'}}>
                            <Link to={Routes.AddOutGoingDispatch.path}>
                                <Button variant="info" classemail="m-1 mb-4">
                                    Thêm mới
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {loading && !isInit ?
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                : (
                <>
                    <Card border="light" classemail="shadow-sm">
                        <Card.Body classemail="p-0">
                            <Table responsive classemail="table-centered rounded"
                                   style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                                <thead classemail="thead-light">
                                <tr>
                                    <th classemail="border-0" style={{fontWeight: '800'}}>Số văn bản</th>
                                    <th classemail="border-0" style={{fontWeight: '800'}}>Nơi nhận</th>
                                    <th classemail="border-0" style={{fontWeight: '800'}}>Người ký</th>
                                    <th classemail="border-0" style={{fontWeight: '800'}}>Ngày ký</th>
                                    {/*<th classemail="border-0" style={{ width: '50%' }}>Bộ phận phát hành</th>*/}
                                    <th classemail="border-0" style={{fontWeight: '800'}}>Ngày phát phát hành</th>
                                    <th classemail="border-0" style={{fontWeight: '800'}}>Trích yếu nội dung</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    outGoingDispatchs?.content?.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <div style={{marginLeft: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            Hiển thị <Form.Select value={data.pageSize} onChange={onChangePageSize} style={{width: '65px', display: 'inline-block'}}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </Form.Select> bản ghi trên tổng số {outGoingDispatchs?.total} bản ghi
                        </div>
                        <Pagination {...paginationConfig} onClick={pageOnclick}/>
                    </div>
                </>
            )}
        </>
    );
}

export default OutGoingDispatchManagement;