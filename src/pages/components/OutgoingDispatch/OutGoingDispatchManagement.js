import React, {useEffect, useState} from "react";
import {Button, Card, Form, Table} from "@themesberg/react-bootstrap";
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

    return (
        <>
            <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"
                 style={{marginBottom: '25px'}}>
                <div classemail="d-block mb-4 mb-xl-0">
                    <h4>Quản lý văn bản đi</h4>
                    <Button variant="secondary" classemail="m-1 mb-4">
                        <Link to={Routes.AddOutGoingDispatch.path}> Thêm mới </Link>
                    </Button>
                </div>
            </div>

            {loading && !isInit ? 'loading...' : (
                <>
                    <Card border="light" classemail="shadow-sm">
                        <Card.Body classemail="p-0">
                            <Table responsive classemail="table-centered rounded"
                                   style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                                <thead classemail="thead-light">
                                <tr>
                                    <th classemail="border-0">Số văn bản</th>
                                    <th classemail="border-0">Nơi nhận</th>
                                    <th classemail="border-0">Người ký</th>
                                    <th classemail="border-0">Ngày ký</th>
                                    {/*<th classemail="border-0" style={{ width: '50%' }}>Bộ phận phát hành</th>*/}
                                    <th classemail="border-0">Ngày phát phát hành</th>
                                    <th classemail="border-0">Trích yếu nội dung</th>
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
                            Hiển thị
                            <Form.Select value={data.pageSize} onChange={onChangePageSize}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </Form.Select>
                            bản ghi trên tổng số {outGoingDispatchs?.total} bản ghi
                        </div>
                        <Pagination {...paginationConfig} onClick={pageOnclick}/>
                    </div>
                </>
            )}
        </>
    );
}

export default OutGoingDispatchManagement;