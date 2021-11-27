import React, {useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Table} from "@themesberg/react-bootstrap";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import TableRow from "./TableRow";

const ComingDispatchDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const {loading, comingDispatchDetail} = useSelector(state => state.comingDispatch);
    const {activityHistories} = useSelector(state => state.activityHistory);

    console.log(111, activityHistories);

    useEffect(() => {
       dispatch(comingDispatchActions.getComingDispatchById(id));
       dispatch(comingDispatchActions.getDispatchStream(id));
    }, []);

    const back = () => {
        history.push("/coming-dispatch");
    }

    const processUrlAttachment = (url) => {
        return `http://localhost:8091/api${url}`;
    }

    return (
        <>
            {loading === true ? <div>Loading...</div> :
            <div className="mainContent">
                <div className="nav">
                    <div className="nav__1">
                        <Button variant="light" classemail="m-1 mb-4" onClick={back}>
                            Quay lại
                        </Button>
                    </div>
                    <div className="nav__2">
                        <Button variant="info" classemail="m-1 mb-4" style={{ marginRight: '10px' }}>
                            Phê duyệt
                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                        </Button>
                        <Button variant="secondary" classemail="m-1 mb-4" style={{ marginRight: '10px' }}>
                            Chuyển tiếp
                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                        </Button>
                        <Button variant="secondary" classemail="m-1 mb-4" style={{ marginRight: '10px' }}>
                            Sửa
                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                        </Button>
                        <Button variant="danger" classemail="m-1 mb-4">
                            Xóa
                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                        </Button>
                    </div>

                </div>
                <div className="body">
                    <div className="body__left">
                        <div className="body__left__1">
                            <h2>Thông tin chung</h2>
                            <div className="body__left__1__content">
                                <div className="body__left__1__content__left">
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Số văn bản:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.comingDispatchResultDTO?.documentNumber}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Người ký:</p>
                                        <p className="body__left__1__content__left__field__result">{comingDispatchDetail.comingDispatchResultDTO?.signBy}</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày ký:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            { moment(comingDispatchDetail.comingDispatchResultDTO?.signDate).format('YYYY-MM-DD') }
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Bộ phận phát hành:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.comingDispatchResultDTO?.releaseDepartment?.departmentName}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Số trang:</p>
                                        <p className="body__left__1__content__left__field__result">{comingDispatchDetail.comingDispatchResultDTO?.totalPage}</p>
                                    </div>
                                </div>

                                <div className="body__left__1__content__right">
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Mức độ bảo mật:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.comingDispatchResultDTO?.securityLevel === 1 ? 'Bình thường' : 'Cao'}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Mức độ khẩn cấp:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.comingDispatchResultDTO?.urgencyLevel === 1 ? 'Bình thường' : 'Cao'}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày hiệu lực:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            { moment(comingDispatchDetail.comingDispatchResultDTO?.effectiveDate).format('YYYY-MM-DD') }
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày hết hiệu lực:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            { moment(comingDispatchDetail.comingDispatchResultDTO?.expirationDate).format('YYYY-MM-DD') }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body__left__2">
                            <h2>Tệp đính kèm</h2>
                            <ul>
                                {comingDispatchDetail.attachments &&
                                    comingDispatchDetail.attachments.map((item) => (
                                        <li key={item.id}>
                                            <a href={processUrlAttachment(item.url)} target="_blank" rel="noopener noreferrer">
                                                {item.fileName}
                                            </a>
                                        </li>
                                ))}
                            </ul>
                        </div>
                        {/*<div className="body__left__3">*/}
                        {/*    <h2>Trao đổi</h2>*/}
                        {/*</div>*/}
                        <div className="body__left__3">
                            <h2>Luồng văn bản</h2>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian thực hiện</th>
                                    <th>Hành động</th>
                                    <th>Người thực hiện</th>
                                    <th>Thông tin</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    activityHistories.map((item, index) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{ moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss') }</td>
                                            <td>{item.action?.actionName}</td>
                                            <td>{item.user?.fullName}</td>
                                            <td>{item?.metaData && Object.keys(item.metaData).map((key, value) => (
                                                `${item.user?.fullName} ${key}: ${item.metaData[key].fullName}`
                                            ))}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="body__right">
                        <div className="body__right__field">
                            <div className="body__right__field__title">Loại văn bản</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.comingDispatchResultDTO?.documentType?.typeName}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Vị trí lưu trữ</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.comingDispatchResultDTO?.storageLocation?.locationName}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người xử lý</div>
                            <span className="body__right__field__result">
                                <ul>
                                    {
                                        (comingDispatchDetail?.processors) &&
                                        comingDispatchDetail?.processors.map((item) => {
                                            return `<li>item.fullName</li>`;
                                        })
                                    }
                                </ul>
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Tình trạng xử lý</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.comingDispatchResultDTO?.status === 1 ? 'Chưa xử lý' : 'Đã xử lý'}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người tạo</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.comingDispatchResultDTO?.createdByUser?.fullName}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Ngày tạo</div>
                            <span className="body__right__field__result">
                                { moment(comingDispatchDetail.comingDispatchResultDTO?.createdAt).format('YYYY-MM-DD HH:mm:ss') }
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người duyệt</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail?.approveBy}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Ngày duyệt</div>
                            <span className="body__right__field__result">
                                { comingDispatchDetail.comingDispatchResultDTO?.approveDate && moment(comingDispatchDetail.comingDispatchResultDTO?.approveDate).format('YYYY-MM-DD HH:mm:ss') }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default ComingDispatchDetail;