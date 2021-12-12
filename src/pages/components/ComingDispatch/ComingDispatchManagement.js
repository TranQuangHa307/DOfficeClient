import React from "react";
import TableRow from "./TableRow";
import {Badge, Button, Card, Form, Spinner, Table} from "@themesberg/react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {Routes} from "../../../routes";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from "react-bootstrap-4-pagination";
import {OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS} from "../../../constants/app";


const ComingDispatchManagement = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatchStatus = searchParams.get('status');
    const {loading, comingDispatchs} = useSelector(state => state.comingDispatch);
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
        dispatch(comingDispatchActions.getAll({
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
                            <Badge pill bg="danger" style={{marginLeft: '7px'}} >
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
        }
    }

    return (
        <>
            <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"
                 style={{marginBottom: '25px'}}>
                <div classemail="d-block mb-4 mb-xl-0">
                    <h4>Quản lý văn bản đến</h4>
                    {
                        renderStatusLabel()
                    }
                    <Button variant="secondary" classemail="m-1 mb-4">
                        <Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>
                    </Button>
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
                                    <th classemail="border-0">Số văn bản</th>
                                    <th classemail="border-0">Nơi gửi</th>
                                    <th classemail="border-0">Người ký</th>
                                    <th classemail="border-0">Ngày ký</th>
                                    <th classemail="border-0">Ngày đến</th>
                                    <th classemail="border-0">Trích yếu nội dung</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    comingDispatchs?.content?.map?.(c => <TableRow key={`command-${c.id}`} {...c} />)
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
                        </Form.Select> bản ghi trên tổng số {comingDispatchs?.total} bản ghi
                        </div>
                        <Pagination {...paginationConfig} onClick={pageOnclick}/>
                    </div>
                </>
            )}
        </>
    );
}

export default ComingDispatchManagement;