import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Table, Modal, Spinner} from "@themesberg/react-bootstrap";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {
    ACTION_ON_DISPATCH_META_DATA_KEYS,
    ACTIVITY_HISTORY_META_DATA_KEYS, OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS,
    ROLE_META_DATA_KEYS
} from "../../../constants/app";
import {toast} from "react-toastify";
import userActions from "../../../actions/userActions";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import SubmitToUnitLeadershipModal from "./SubmitToUnitLeadershipModal";
import SubmitToOfficeLeadershipModal from "./SubmitToOfficeLeadershipModal";


const OutGoingDispatchDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const {loading, outGoingDispatchDetail} = useSelector(state => state.outGoingDispatch);
    const {activityHistories} = useSelector(state => state.activityHistory);
    const {user} = useSelector(state => state.authentication);

    const [showSubmitToLeadershipModal, setShowSubmitToLeadershipModal] = useState(false);
    const [showSubmitToOfficeLeadershipModal, setShowSubmitToOfficeLeadershipModal] = useState(false);

    // const check = user?.id === comingDispatchDetail?.comingDispatchResultDTO?.createdByUser?.id
    // console.log(111, activityHistories);

    // console.log(11111, outGoingDispatchDetail);

    useEffect(() => {
        dispatch(outGoingDispatchActions.getOutGoingDispatchById(id));
        dispatch(comingDispatchActions.getDispatchStream(id));
        dispatch(comingDispatchActions.getUserViewDispatch(id));
        dispatch(userActions.getAllUser());
    }, []);

    const back = () => {
        history.push("/out-going-dispatch");
    }

    const processUrlAttachment = (url) => {
        return `http://localhost:8091/api${url}`;
    }

    const [show, setShow] = useState(false);

    const deleteModal = () => {
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const deleteDispatch = () => {
        setIsDeleting(true);
        dispatch(outGoingDispatchActions.deleteOutGoingDispatch(id))
            .then(() => {
                toast.success("Xóa văn bản đi thành công", {autoClose: 3000, hideProgressBar: true});
                history.push("/out-going-dispatch");
                setIsDeleting(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Đã xảy ra lỗi. Vui lòng liên hệ quản trị viên để được hỗ trợ", {
                    autoClose: 3000,
                    hideProgressBar: true
                });
                setIsDeleting(false);
            });
    }

    const getMetaData = (metaData, key) => {
        const keyName = ACTIVITY_HISTORY_META_DATA_KEYS[key] ?? key;
        let value = '';
        switch (key) {
            case 'assignFor':
            case 'addViewer':
            case 'Trình lãnh đạo đơn vị' :
                value = metaData[key].fullName;
                break;
            default:
                value = metaData[key];
                break;
        }
        return `${keyName}: ${value}`;
    };

    // Từ chối dùng chung

    const renderCreatorButtons = () => {
        return (
            <>
                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    // disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoDonViKy}
                    onClick={() => setShowSubmitToLeadershipModal(true)}
                >
                    Trình lãnh đạo đơn vị
                </Button>

                <Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                    <Link to={`/out-going-dispatch/edit/${id}`}> Sửa </Link>
                </Button>

                <Button variant="danger" classemail="m-1 mb-4" onClick={deleteModal}>
                    Xóa
                </Button>
            </>
        );
    };

    const renderUnitLeadershipButtons = () => {
        return (
            <>
                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoCoQuanKy}
                    onClick={() => setShowSubmitToOfficeLeadershipModal(true)}
                >
                    Phê duyệt
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoCoQuanKy}
                >
                    Từ chối
                </Button>
            </>
        );
    };

    const renderOfficeLeadershipButtons = () => {
        return (
            <>
                <Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                    <Link to={`#`}> Phê duyệt </Link>
                </Button>

                <Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                    <Link to={`#`}> Từ chối </Link>
                </Button>
            </>
        );
    };

    const renderVanThuButtons = () => {
        return (
            <>
                <Button
                    variant="secondary"
                    classemail="m-1 mb-4" style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.isTakenNumber}
                >
                    <Link to={`#`}> Cấp số </Link>
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4" style={{marginRight: '10px'}}
                    disabled={false}
                >
                    <Link to={`#`}> Phát hành </Link>
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4" style={{marginRight: '10px'}}
                    disabled={false}
                >
                    <Link to={`#`}> Lưu trữ </Link>
                </Button>
            </>
        );
    };

    const renderButtonGroup = () => {
        const roles = user?.roles;
        const isCreator = user?.user?.id === outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.createdByUser?.id;
        const isUnitLeadership = roles?.some((role, index) => {
            return role === ROLE_META_DATA_KEYS.unitLeadership;
        });
        const isOfficeLeadership = roles?.some((role, index) => {
            return role === ROLE_META_DATA_KEYS.officeLeadership;
        });
        const isVanThu = roles?.some((role, index) => {
            return role === ROLE_META_DATA_KEYS.vanThu;
        });
        if (isCreator) { // check la nguoi tao cong van
            return renderCreatorButtons();
        }
        if (isUnitLeadership) { // check la lanh dao don vi
            return renderUnitLeadershipButtons();
        }
        if (isOfficeLeadership) { // check la lanh dao co quan
            return renderOfficeLeadershipButtons();
        }
        if (isVanThu) { // check la van thu
            return renderVanThuButtons();
        }
        return null;
    }

    // const currentViewType = (userViewDispatch && userViewDispatch.length > 0)
    //     ? userViewDispatch[0]?.userViewTypeEntity?.viewType
    //     : null;
    // const actionDisabled = comingDispatchDetail?.comingDispatchResultDTO?.status === 2 || currentViewType !== 'PROCESSER';

    const renderStatus = () => {
        const status = outGoingDispatchDetail.outGoingDispatchResultNewDTO?.status;
        if (status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.daXuLy) {
            return "Đã xử lý";
        }
        return "Chưa xử lý";
    }

    return (
        <>
            <SubmitToUnitLeadershipModal
                show={showSubmitToLeadershipModal}
                onClose={() => setShowSubmitToLeadershipModal(false)}
            />

            <SubmitToOfficeLeadershipModal
                show={showSubmitToOfficeLeadershipModal}
                onClose={() => setShowSubmitToOfficeLeadershipModal(false)}
            />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa công văn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắn chắn bạn thực sự muốn xóa công văn này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={deleteDispatch} disabled={isDeleting}>
                        {
                            isDeleting &&
                            <Spinner
                                animation="border"
                                role="status"
                                size="sm">
                            </Spinner>
                        }
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>

            {loading === true ? <div>Loading...</div> :
                <div className="mainContent">
                    <div className="nav">
                        <div className="nav__1">
                            <Button variant="light" classemail="m-1 mb-4" onClick={back}>
                                Quay lại
                            </Button>
                        </div>
                        <div className="nav__2">
                            {/*{*/}
                            {/*    actionDisabled ? (*/}
                            {/*        <>*/}
                            {/*            <Button disabled variant="info" classemail="m-1 mb-4" style={{marginRight: '10px'}}>*/}
                            {/*                Phê duyệt*/}
                            {/*                /!*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*!/*/}
                            {/*            </Button>*/}
                            {/*            <Button disabled variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>*/}
                            {/*                Chuyển tiếp*/}
                            {/*                /!*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*!/*/}
                            {/*            </Button>*/}
                            {/*        </>*/}
                            {/*    ) : (*/}
                            {/*        <>*/}
                            {/*            <Button onClick={() => setShowApproveModal(true)} variant="info" classemail="m-1 mb-4" style={{marginRight: '10px'}}>*/}
                            {/*                Phê duyệt*/}
                            {/*                /!*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*!/*/}
                            {/*            </Button>*/}
                            {/*            <Button onClick={() => setShowForwardModal(true)} variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>*/}
                            {/*                Chuyển tiếp*/}
                            {/*                /!*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*!/*/}
                            {/*            </Button>*/}
                            {/*        </>*/}
                            {/*    )*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    isShowDelEditBtn &&*/}
                            {/*    <>*/}
                            {/*        <Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>*/}
                            {/*            <Link to={`/coming-dispatch/edit/${id}`}> Sửa </Link>*/}
                            {/*        </Button>*/}
                            {/*        <Button variant="danger" classemail="m-1 mb-4" onClick={deleteModal}>*/}
                            {/*            Xóa*/}
                            {/*            /!*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*!/*/}
                            {/*        </Button>*/}
                            {/*    </>*/}
                            {/*}*/}


                            {/*<Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>*/}
                            {/*    <Link to={`/coming-dispatch/edit/${id}`}> Sửa </Link>*/}
                            {/*</Button>*/}
                            {/*<Button variant="danger" classemail="m-1 mb-4" onClick={deleteModal}>*/}
                            {/*    Xóa*/}
                            {/*    /!*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*!/*/}
                            {/*</Button>*/}


                            {renderButtonGroup()}

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
                                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.documentNumber}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Nơi nhận:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.receiveAddress}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Người ký:</p>
                                            <p className="body__left__1__content__left__field__result">{outGoingDispatchDetail.outGoingDispatchResultNewDTO?.signBy}</p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Ngày ký:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(outGoingDispatchDetail.outGoingDispatchResultNewDTO?.signDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        {/*<div className="body__left__1__content__left__field">*/}
                                        {/*    <p className="body__left__1__content__left__field__title">Bộ phận phát*/}
                                        {/*        hành:</p>*/}
                                        {/*    <p className="body__left__1__content__left__field__result">*/}
                                        {/*        {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.releaseDepartment?.departmentName}*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Số trang:</p>
                                            <p className="body__left__1__content__left__field__result">{outGoingDispatchDetail.outGoingDispatchResultNewDTO?.totalPage}</p>
                                        </div>
                                    </div>

                                    <div className="body__left__1__content__right">

                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Mức độ bảo
                                                mật:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.securityLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Mức độ khẩn
                                                cấp:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.urgencyLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Ngày hiệu lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(outGoingDispatchDetail.outGoingDispatchResultNewDTO?.effectiveDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Ngày hết hiệu
                                                lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(outGoingDispatchDetail.outGoingDispatchResultNewDTO?.expirationDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body__left__2">
                                <h2>Tệp đính kèm</h2>
                                <ul>
                                    {outGoingDispatchDetail.attachments &&
                                    outGoingDispatchDetail.attachments.map((item) => (
                                        <li key={item.id}>
                                            <a href={processUrlAttachment(item.url)} target="_blank"
                                               rel="noopener noreferrer">
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
                                                <td>{index + 1}</td>
                                                <td>{moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                <td>{ACTION_ON_DISPATCH_META_DATA_KEYS[item.action?.actionName]}</td>
                                                <td>{item.user?.fullName}</td>
                                                <td>{item?.metaData && Object.keys(item.metaData).map((key, keyIndex) => <div key={keyIndex}>{getMetaData(item.metaData, key)}</div>)}</td>
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
                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.documentType?.typeName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Vị trí lưu trữ</div>
                                <span className="body__right__field__result">
                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.storageLocation?.locationName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người xử lý</div>
                                <span className="body__right__field__result">
                                <ul>
                                    {
                                        outGoingDispatchDetail?.processors &&
                                        outGoingDispatchDetail?.processors.map((item) => (
                                            <li key={item.processor.id}>
                                                {item.processor.fullName}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Tình trạng xử lý</div>
                                <span className="body__right__field__result">
                                    {
                                        renderStatus()
                                    }
                                </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người tạo</div>
                                <span className="body__right__field__result">
                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.createdByUser?.fullName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Ngày tạo</div>
                                <span className="body__right__field__result">
                                {moment(outGoingDispatchDetail.outGoingDispatchResultNewDTO?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người duyệt</div>
                                <span className="body__right__field__result">
                                {outGoingDispatchDetail?.approveBy}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Ngày duyệt</div>
                                <span className="body__right__field__result">
                                {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.approveDate && moment(outGoingDispatchDetail.outGoingDispatchResultNewDTO?.approveDate).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/*{*/}
            {/*    !actionDisabled && (*/}
            {/*        <>*/}
            {/*            <ForwardModal*/}
            {/*                show={showForwardModal}*/}
            {/*                onClose={() => setShowForwardModal(false)}*/}
            {/*            />*/}
            {/*            <ApproveModal*/}
            {/*                show={showApproveModal}*/}
            {/*                onClose={() => setShowApproveModal(false)}*/}
            {/*            />*/}
            {/*        </>*/}
            {/*    )*/}
            {/*}*/}
        </>
    );
}

export default OutGoingDispatchDetail;