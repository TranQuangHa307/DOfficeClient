import React, {useEffect, useState} from "react";
import {Button} from "@themesberg/react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import userActions from "../../../actions/userActions";
import moment from "moment";

const UserDetail = () => {
    const {id} = useParams();
    const {loading, userDetail} = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const back = () => {
        history.push("/user");
    }

    useEffect(() => {
        dispatch(userActions.getUserById(id));
    }, []);

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

                            <Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                                {/*<Link to={`/coming-dispatch/edit/${id}`}> Sửa </Link>*/}
                                Sửa
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
                                <h2>Thông tin user</h2>
                                <div className="body__left__1__content">
                                    <div className="body__left__1__content__left">
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Tên đầy đủ:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {userDetail?.userEntity?.fullName}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Email:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {userDetail?.userEntity?.email}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Phone:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {userDetail?.userEntity?.phone}
                                                {/*{moment(comingDispatchDetail.comingDispatchResultDTO?.signDate).format('YYYY-MM-DD')}*/}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="body__left__1__content__right">
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">
                                                Tên tài khoản:
                                            </p>
                                            <p className="body__left__1__content__left__field__result">
                                                {userDetail?.userEntity?.userName}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Mật khẩu:</p>
                                            <p className="body__left__1__content__left__field__result body__left__1__content__left__field__result--password-field">
                                                {userDetail?.userEntity?.password}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">
                                                Mô tả
                                            </p>
                                            <p className="body__left__1__content__left__field__result">
                                                {userDetail?.userEntity?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body__left__2">
                            </div>
                            <div className="body__left__3">
                            </div>
                        </div>
                        <div className="body__right">
                            {/*<div className="body__right__field">*/}
                            {/*    <div className="body__right__field__title">Được tạo bởi</div>*/}
                            {/*    <span className="body__right__field__result">*/}
                            {/*        {userDetail?.userEntity?.createdBy}*/}
                            {/*    </span>*/}
                            {/*</div>*/}

                            <div className="body__right__field">
                                <div className="body__right__field__title">Thời gian tạo</div>
                                <span className="body__right__field__result">
                                    {moment(userDetail?.userEntity?.createdTime).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Trạng thái hoạt động</div>
                                <span className="body__right__field__result">
                                    {userDetail?.userEntity?.isActive === true ? 'Đang hoạt động' : 'Dừng hoạt động'}
                                </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Role</div>
                                <span className="body__right__field__result">
                                    <ul>
                                        {userDetail?.roles?.map((role, index) => {
                                            return <li key={index}>{role?.roleName}</li>
                                        })}

                                    </ul>
                                </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Permission</div>
                                <span className="body__right__field__result">
                                    <ul>
                                        {userDetail?.permissions?.map((per, index) => {
                                            return <li key={index}>{per?.permissionName}</li>
                                        })}
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default UserDetail;