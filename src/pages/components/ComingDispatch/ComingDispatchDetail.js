import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {Button} from "@themesberg/react-bootstrap";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import UploadFiles from "../UploadFiles";


const ComingDispatchDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const {loading, comingDispatchDetail} = useSelector(state => state.comingDispatch);

    console.log(111, comingDispatchDetail);

    useEffect(() => {
       dispatch(comingDispatchActions.getComingDispatchById(id));
    }, []);

    return (
        <>
            {loading === true ? <div>Loading...</div> :


            <div className="mainContent">
                <div className="nav">
                    <div className="nav__1">
                        <Button variant="secondary" classemail="m-1 mb-4">
                            Quay lại
                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                        </Button>
                    </div>
                    <div className="nav__2">
                        <Button variant="secondary" classemail="m-1 mb-4" style={{ marginRight: '10px' }}>
                            Lấy số
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
                        <Button variant="secondary" classemail="m-1 mb-4">
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
                                        <p className="body__left__1__content__left__field__result">{comingDispatchDetail.documentNumber}</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Người ký:</p>
                                        <p className="body__left__1__content__left__field__result">{comingDispatchDetail.signBy}</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày ký:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            { moment(comingDispatchDetail.signDate).format('YYYY-MM-DD') }
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Bộ phận phát hành:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.releaseDepartment?.departmentName}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Số trang:</p>
                                        <p className="body__left__1__content__left__field__result">{comingDispatchDetail.totalPage}</p>
                                    </div>
                                </div>

                                <div className="body__left__1__content__right">
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Mức độ bảo mật:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.securityLevel === 1 ? 'Bình thường' : 'Cao'}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Mức độ khẩn cấp:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            {comingDispatchDetail.urgencyLevel === 1 ? 'Bình thường' : 'Cao'}
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày hiệu lực:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            { moment(comingDispatchDetail.effectiveDate).format('YYYY-MM-DD') }
                                        </p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày hết hiệu lực:</p>
                                        <p className="body__left__1__content__left__field__result">
                                            { moment(comingDispatchDetail.expirationDate).format('YYYY-MM-DD') }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body__left__2">
                            <h2>Tệp đính kèm</h2>
                        </div>
                        <div className="body__left__3">
                            <h2>Trao đổi</h2>
                        </div>
                        <div className="body__left__3">
                            <h2>Luồng văn bản</h2>
                        </div>
                    </div>
                    <div className="body__right">
                        <div className="body__right__field">
                            <div className="body__right__field__title">Loại văn bản</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.documentType?.typeName}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Vị trí lưu trữ</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.storageLocation?.locationName}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người xử lý</div>
                            <span className="body__right__field__result">
                                ??
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Tình trạng xử lý</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.status === 1 ? 'Chưa xử lý' : 'Đã xử lý'}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người tạo</div>
                            <span className="body__right__field__result">
                                {comingDispatchDetail.createdByUser?.fullName}
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Ngày tạo</div>
                            <span className="body__right__field__result">
                                { moment(comingDispatchDetail.createdAt).format('YYYY-MM-DD HH:mm:ss') }
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người duyệt</div>
                            <span className="body__right__field__result">
                                ??
                            </span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Ngày duyệt</div>
                            <span className="body__right__field__result">
                                ??
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