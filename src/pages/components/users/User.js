import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Table} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';
import {Routes} from '../../../routes';
import TableRow from "./TableRow";
import {useDispatch, useSelector} from "react-redux";
import userActions from "../../../actions/userActions";
import Pagination from "react-bootstrap-4-pagination";

export default () => {
    const dispatch = useDispatch();
    const {loading, users} = useSelector(state => state.user);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [paginationConfig, setPaginationConfig] = useState({});

    useEffect(() => {
        dispatch(userActions.getAllUser())
            .then((result) => {
                setPaginationConfig({
                    size: "md",
                    totalPages: Math.ceil(result?.length / pageSize),
                    currentPage: currPage,
                })
            });
    }, []);

    const pageOnclick = (page) => {
        console.log(page);
        setPaginationConfig({
            size: "md",
            totalPages: Math.ceil(users?.length / pageSize),
            currentPage: page,
        })
        setCurrPage(page);
        setPageSize(pageSize);
        renderUser();
    }

    const renderUser = () => {
        const indexOfLast = currPage * pageSize;
        const indexOfFirst = indexOfLast - pageSize;
        // console.log(indexOfLast, '--->', indexOfFirst);
        const currUser = users.slice(indexOfFirst, indexOfLast);
        let index1 = indexOfFirst;  // STT
        return currUser.map?.((c, index) => {
            index1 ++;
            return <TableRow index={index1} key={`command-${c?.userEntity?.id}`} {...c} />
        })
    }

    const onChangePageSize = (e) => {
        setPaginationConfig({
            size: "md",
            totalPages: Math.ceil(users?.length / parseInt(e.target.value)),
            currentPage: 1,
        })
        setCurrPage(1);
        setPageSize(e.target.value);
    }

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

            {loading ? 'loading...' : (
                <>
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
                                {/*{users.map?.((c, index) => <TableRow index={index}*/}
                                {/*                                     key={`command-${c?.userEntity?.id}`} {...c} />)}*/}
                                {
                                    renderUser()
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <div style={{
                        marginLeft: '12px',
                        marginTop: '12px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            Hiển thị <Form.Select value={pageSize}
                                                  onChange={onChangePageSize}
                                                  style={{width: '65px', display: 'inline-block'}}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </Form.Select> bản ghi trên tổng số {users?.length} bản ghi
                        </div>
                        <Pagination {...paginationConfig} onClick={pageOnclick}/>
                    </div>
                </>
            )}
        </>
    )
}