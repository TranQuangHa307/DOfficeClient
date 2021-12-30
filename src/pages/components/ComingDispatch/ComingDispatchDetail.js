import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Table, Modal, Spinner} from "@themesberg/react-bootstrap";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {ACTION_ON_DISPATCH_META_DATA_KEYS, ACTIVITY_HISTORY_META_DATA_KEYS} from "../../../constants/app";
import {toast} from "react-toastify";
import userActions from "../../../actions/userActions";
import ForwardModal from "./ForwardModal";
import ApproveModal from "./ApproveModal";
import FileViewerModal from "../FileViewer/FileViewerModal";
import AddViewerToDispatchModal from "../OutgoingDispatch/AddViewerToDispatchModal";
import countDispatchActions from "../../../actions/countDispatchActions";

const ComingDispatchDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const {loading, comingDispatchDetail, userViewDispatch} = useSelector(state => state.comingDispatch);
    const {activityHistories} = useSelector(state => state.activityHistory);
    const {user} = useSelector(state => state.authentication);

    const [isShowDelEditBtn, setIsShowDelEditBtn] = useState(false);
    const [showForwardModal, setShowForwardModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showFileViewerModal, setShowFileViewerModal] = useState(false);
    const [selectedFileUrl, setSelectedFileUrl] = useState(undefined);
    const [showAddViewerToDispatchModal, setShowAddViewerToDispatchModal] = useState(false);
    // const check = user?.id === comingDispatchDetail?.comingDispatchResultDTO?.createdByUser?.id
    // console.log(111, activityHistories);

    useEffect(() => {
        dispatch(comingDispatchActions.getUserViewDispatch(id))
            .then((result) => {
                if (!result.length) {
                    history.push('/examples/404');
                    return;
                }
                dispatch(comingDispatchActions.getComingDispatchById(id));
                dispatch(comingDispatchActions.getDispatchStream(id));
                dispatch(userActions.getAllUser());
            });
    }, []);

    const back = () => {
        history.push("/coming-dispatch");
    }

    const processUrlAttachment = (url) => {
        return `http://13.250.40.151/do-backend/api${url}`;
    }

    const [show, setShow] = useState(false);

    const deleteModal = () => {
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const deleteDispatch = () => {
        setIsDeleting(true);
        dispatch(comingDispatchActions.deleteComingDispatch(id))
            .then(() => {
                toast.success("Xóa văn bản đến thành công", {autoClose: 3000, hideProgressBar: true});
                dispatch(countDispatchActions.getCountDispatch());
                history.push("/coming-dispatch");
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
            case 'Chuyển tiếp cho':
                value = metaData[key].fullName;
                break;
            default:
                value = metaData[key];
                break;
        }
        return `${keyName}: ${value}`;
    };

    const processFileModal = (item) => {
        setShowFileViewerModal(true);
        const url = processUrlAttachment(item?.url);
        // console.log(11111, url)
        setSelectedFileUrl(url);
    }

    const currentViewType = (userViewDispatch && userViewDispatch.length > 0)
        ? userViewDispatch[0]?.userViewTypeEntity?.viewType
        : null;
    const actionDisabled = comingDispatchDetail?.comingDispatchResultDTO?.status === 2 || currentViewType !== 'PROCESSER';

    const renderViewers = () => {
        const viewers = comingDispatchDetail?.viewers;
        const viewersSet = [...new Map(viewers?.map(v => [v?.viewer?.id, v])).values()]  // Xử lí trùng lặp
        return viewersSet
            .filter((item) => item?.viewer?.id !== comingDispatchDetail?.comingDispatchResultDTO?.createdByUser?.id)
            .map((item) => (
            <li key={item?.viewer?.id}>
                {item?.viewer?.fullName}
            </li>
        ))
    }

    return (
        <>
            <AddViewerToDispatchModal
                show={showAddViewerToDispatchModal}
                onClose={() => setShowAddViewerToDispatchModal(false)}
            />

            <FileViewerModal
                show={showFileViewerModal}
                onClose={() => setShowFileViewerModal(false)}
                selectedFileUrl={selectedFileUrl}
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
                    <Button variant="primary" onClick={deleteDispatch}>
                        {
                            isDeleting &&
                            <Spinner
                                style={{marginRight: '5px'}}
                                animation="border"
                                role="status"
                                size="sm">
                            </Spinner>
                        }
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>

            {loading === true ?
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                :
                <div className="mainContent">
                    <div className="nav">
                        <div className="nav__1">
                            <Button variant="light" classemail="m-1 mb-4" onClick={back}>
                                Quay lại
                            </Button>
                        </div>
                        <div className="nav__2">
                            {
                                actionDisabled ? (
                                    <>
                                        <Button disabled variant="info" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                                            Phê duyệt
                                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                                        </Button>
                                        <Button disabled variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                                            Chuyển tiếp
                                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => setShowApproveModal(true)} variant="info" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                                            Phê duyệt
                                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                                        </Button>
                                        <Button onClick={() => setShowForwardModal(true)} variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                                            Chuyển tiếp
                                            {/*<Link to={Routes.AddComingDispatch.path}> Thêm mới </Link>*/}
                                        </Button>
                                    </>
                                )
                            }
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

                            <Button variant="secondary" classemail="m-1 mb-4" style={{marginRight: '10px'}}>
                                <Link to={`/coming-dispatch/edit/${id}`}> Sửa </Link>
                            </Button>
                            <Button variant="danger" classemail="m-1 mb-4" onClick={deleteModal}>
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
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Số văn bản:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {comingDispatchDetail.comingDispatchResultDTO?.documentNumber}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Người ký:</p>
                                            <p className="body__left__1__content__left__field__result">{comingDispatchDetail.comingDispatchResultDTO?.signBy}</p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Ngày ký:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(comingDispatchDetail.comingDispatchResultDTO?.signDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Bộ phận phát hành:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {comingDispatchDetail.comingDispatchResultDTO?.releaseDepartment?.departmentName}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Số trang:</p>
                                            <p className="body__left__1__content__left__field__result">{comingDispatchDetail.comingDispatchResultDTO?.totalPage}</p>
                                        </div>
                                    </div>

                                    <div className="body__left__1__content__right">
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Mức độ bảo mật:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {comingDispatchDetail.comingDispatchResultDTO?.securityLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Mức độ khẩn
                                                cấp:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {comingDispatchDetail.comingDispatchResultDTO?.urgencyLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Ngày hiệu lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(comingDispatchDetail.comingDispatchResultDTO?.effectiveDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Ngày hết hiệu
                                                lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(comingDispatchDetail.comingDispatchResultDTO?.expirationDate).format('YYYY-MM-DD')}
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
                                        // <li key={item.id}>
                                        //     <a href={processUrlAttachment(item.url)} target="_blank"
                                        //        rel="noopener noreferrer">
                                        //         {item.fileName}
                                        //     </a>
                                        // </li>
                                        <li style={{cursor: 'pointer'}} key={item.id}
                                            onClick={() => processFileModal(item)}>
                                            {item.fileName}
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
                                                <td>{moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                <td>{ACTION_ON_DISPATCH_META_DATA_KEYS[item.action?.actionName]}</td>
                                                <td>{item.user?.fullName}</td>
                                                {/*<td>{item?.metaData && Object.keys(item.metaData).map((key, value) => getMetaData(item.metaData, key))}</td>*/}
                                                <td>
                                                    {
                                                        item?.metaData && Object.keys(item.metaData)
                                                        .map((key, keyIndex) => <div key={keyIndex}>{getMetaData(item.metaData, key)}</div>)
                                                    }
                                                </td>
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
                                        comingDispatchDetail?.processors &&
                                        comingDispatchDetail?.processors.map((item) => (
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
                                {moment(comingDispatchDetail.comingDispatchResultDTO?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người duyệt</div>
                                <span className="body__right__field__result">
                                {comingDispatchDetail?.comingDispatchResultDTO?.approveByUser?.fullName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Ngày duyệt</div>
                                <span className="body__right__field__result">
                                    {comingDispatchDetail.comingDispatchResultDTO?.approveDate && moment(comingDispatchDetail.comingDispatchResultDTO?.approveDate).format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người theo dõi</div>
                                <span className="body__right__field__result">
                                    {
                                        renderViewers()
                                    }
                                    <p
                                        style={{cursor:'pointer', color: '#c88094'}}
                                        onClick={() => setShowAddViewerToDispatchModal(true)}
                                    >Thêm người theo dõi?</p>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            }
            {
                !actionDisabled && (
                    <>
                        <ForwardModal
                            show={showForwardModal}
                            onClose={() => setShowForwardModal(false)}
                        />
                        <ApproveModal
                            show={showApproveModal}
                            onClose={() => setShowApproveModal(false)}
                        />
                    </>
                )
            }
        </>
    );
}

export default ComingDispatchDetail;