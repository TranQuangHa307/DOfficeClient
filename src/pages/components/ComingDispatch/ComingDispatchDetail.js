import React from "react";
import {Link} from "react-router-dom";
import {Routes} from "../../../routes";
import {Button} from "@themesberg/react-bootstrap";

const ComingDispatchDetail = () => {







    return (
        <>
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
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Nơi nhận:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Người ký:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày ký:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Bộ phận phát hành:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày phát hành:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                </div>
                                <div className="body__left__1__content__right">
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Số trang:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Số lượng văn bản:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Mức độ bảo mật:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Mức độ khẩn cấp:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày hiệu lực:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
                                    </div>
                                    <div className="body__left__1__content__left__field">
                                        <p className="body__left__1__content__left__field__title">Ngày hết hiệu lực:</p>
                                        <p className="body__left__1__content__left__field__result">01</p>
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
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Vị trí lưu trữ</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người xử lý</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Tình trạng xử lý</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người tạo</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Ngày tạo</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Người duyệt</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>

                        <div className="body__right__field">
                            <div className="body__right__field__title">Ngày duyệt</div>
                            <span className="body__right__field__result">Đề nghị</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComingDispatchDetail;