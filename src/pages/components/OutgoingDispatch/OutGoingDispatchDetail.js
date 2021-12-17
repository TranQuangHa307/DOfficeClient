import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Card, Table, Modal, Spinner} from "@themesberg/react-bootstrap";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {
    ACTION_ON_DISPATCH_META_DATA_KEYS,
    ACTIVITY_HISTORY_META_DATA_KEYS, OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS, PUBLISHED_DISPATCH_URL,
    ROLE_META_DATA_KEYS
} from "../../../constants/app";
import {toast} from "react-toastify";
import userActions from "../../../actions/userActions";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import SubmitToUnitLeadershipModal from "./SubmitToUnitLeadershipModal";
import SubmitToOfficeLeadershipModal from "./SubmitToOfficeLeadershipModal";
import RejectDispatchModal from "./RejectDispatchModal";
import SubmitToVanThuModal from "./SubmitToVanThuModal";
import FileViewerModal from "../FileViewer/FileViewerModal";
import AddViewerToDispatchModal from "./AddViewerToDispatchModal";
import countDispatchActions from "../../../actions/countDispatchActions";


const OutGoingDispatchDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const {loading, outGoingDispatchDetail} = useSelector(state => state.outGoingDispatch);
    const {activityHistories} = useSelector(state => state.activityHistory);
    const {user} = useSelector(state => state.authentication);

    const [showSubmitToLeadershipModal, setShowSubmitToLeadershipModal] = useState(false);
    const [showSubmitToOfficeLeadershipModal, setShowSubmitToOfficeLeadershipModal] = useState(false);
    const [showRejectDispatchModal, setShowRejectDispatchModal] = useState(false);
    const [showSubmitToVanThuModal, setShowSubmitToVanThuModal] = useState(false);
    const [showFileViewerModal, setShowFileViewerModal] = useState(false);
    const [showAddViewerToDispatchModal, setShowAddViewerToDispatchModal] = useState(false);

    useEffect(() => {
        dispatch(comingDispatchActions.getUserViewDispatch(id))
            .then((result) => {
                if (!result.length) {
                    history.push('/examples/404');
                    return;
                }
                dispatch(outGoingDispatchActions.getOutGoingDispatchById(id));
                dispatch(comingDispatchActions.getDispatchStream(id));
                dispatch(userActions.getAllUser());
            });
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
                dispatch(countDispatchActions.getCountDispatch());
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
            case 'signBy' :
            case 'forwardTo' :
                value = metaData[key].fullName;
                break;
            default:
                value = metaData[key];
                break;
        }
        return `${keyName}: ${value}`;
    };

    const generateDispatchNumber = () => {
        dispatch(outGoingDispatchActions.generateDispatchNumber(id))
            .then(() => {
                dispatch(comingDispatchActions.getDispatchStream(id));
                dispatch(outGoingDispatchActions.getOutGoingDispatchById(id));
                toast.success('Cấp số thành công', {autoClose: 3000, hideProgressBar: true});
            })
            .catch(() => {
                toast.error('Đã có lỗi xảy ra, vui lòng thử lại', {autoClose: 3000, hideProgressBar: true});
            })
    }

    const publishedDispatchLink = PUBLISHED_DISPATCH_URL + `${id}`;

    const publishedDispatch = () => {
        dispatch(outGoingDispatchActions.publish(id))
            .then(() => {
                dispatch(comingDispatchActions.getDispatchStream(id));
                dispatch(outGoingDispatchActions.getOutGoingDispatchById(id));
                toast.success('Phát hành văn bản thành công', {autoClose: 3000, hideProgressBar: true});
            })
            .catch(() => {
                toast.error('Đã có lỗi xảy ra, vui lòng thử lại', {autoClose: 3000, hideProgressBar: true});
            })
    }

    const archiveDispatch = () => {
        dispatch(outGoingDispatchActions.archive(id))
            .then(() => {
                dispatch(comingDispatchActions.getDispatchStream(id));
                dispatch(outGoingDispatchActions.getOutGoingDispatchById(id));
                toast.success('Lưu trữ văn bản thành công', {autoClose: 3000, hideProgressBar: true});
            })
            .catch(() => {
                toast.error('Đã có lỗi xảy ra, vui lòng thử lại', {autoClose: 3000, hideProgressBar: true});
            })
    }

    const renderCreatorButtons = () => {
        return (
            <>
                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status !== OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.chuaXuLy}
                    onClick={() => setShowSubmitToLeadershipModal(true)}
                >
                    Trình lãnh đạo đơn vị
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}

                >
                    <Link to={`/out-going-dispatch/edit/${id}`}> Sửa </Link>
                </Button>

                <Button
                    variant="danger"
                    classemail="m-1 mb-4"
                    onClick={deleteModal}

                >
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
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status !== OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoDonViKy}
                    onClick={() => setShowSubmitToOfficeLeadershipModal(true)}
                >
                    Phê duyệt
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status !== OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoDonViKy}
                    onClick={() => setShowRejectDispatchModal(true)}
                >
                    Từ chối
                </Button>
            </>
        );
    };

    const renderOfficeLeadershipButtons = () => {
        return (
            <>
                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status !== OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoCoQuanKy}
                    onClick={() => setShowSubmitToVanThuModal(true)}
                >
                    Phê duyệt
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4"
                    style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status !== OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoCoQuanKy}
                    onClick={() => setShowRejectDispatchModal(true)}
                >
                    Từ chối
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
                    onClick={generateDispatchNumber}
                >
                    Cấp số
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4" style={{marginRight: '10px'}}
                    disabled={outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.isPublished || !outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.isTakenNumber}
                    onClick={publishedDispatch}
                >
                    Phát hành
                </Button>

                <Button
                    variant="secondary"
                    classemail="m-1 mb-4" style={{marginRight: '10px'}}
                    disabled={!outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.isPublished}
                    onClick={archiveDispatch}
                >
                    Lưu trữ
                </Button>
            </>
        );
    };

    const renderButtonGroup = () => {
        if (removePermissionOfFollowerToDispatch()) {
          return;
        };
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
        const status = outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.status;
        if (status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.chuaXuLy) {
            return "Chưa xử lý";
        }
        if (status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoDonViKy) {
            return "Trình lãnh đạo đơn vị";
        }
        if (status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoCoQuanKy) {
            return "Trình lãnh đạo cơ quan";
        }
        return "Đã xử lý";
    }

    const renderProcessor = () => {
        const processors = outGoingDispatchDetail?.processors;
        const processorsSet = [...new Map(processors?.map(v => [v?.processor?.id, v])).values()]  // Xử lí trùng lặp
        return processorsSet.map((item) => (
            <li key={item?.processor?.id}>
                {item?.processor?.fullName}
            </li>
        ))
    }

    const renderViewers = () => {
        const viewers = outGoingDispatchDetail?.viewers;
        const viewersSet = [...new Map(viewers?.map(v => [v?.viewer?.id, v])).values()]  // Xử lí trùng lặp
        return viewersSet
            .filter((item) => item?.viewer?.id !== outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.createdByUser?.id)  // lọc người tạo công văn, vì backend chưa xử lý được
            .map((item) => (
            <li key={item?.viewer?.id}>
                {item?.viewer?.fullName}
            </li>
        ))
    }

    const removePermissionOfFollowerToDispatch = () => {
        const userLogin = user?.user?.id;
        const viewers = outGoingDispatchDetail?.viewers;
        const viewersSet = [...new Map(viewers?.map(v => [v?.viewer?.id, v])).values()]  // Xử lí trùng lặp
        const check = viewersSet
            .filter((item) => item?.viewer?.id !== outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.createdByUser?.id)
            .some((item) => item?.viewer?.id === userLogin) // nếu thằng đang đăng nhập có mặt trong danh sách người theo dõi --> thì loại bỏ hết quyền của nó đối với công văn.
        return check;
    }

    const [selectedFileUrl, setSelectedFileUrl] = useState(undefined);

    const processFileModal = (item) => {
        setShowFileViewerModal(true);
        const url = processUrlAttachment(item?.url);
        console.log(11111, url)
        setSelectedFileUrl(url);
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

            <RejectDispatchModal
                show={showRejectDispatchModal}
                onClose={() => setShowRejectDispatchModal(false)}
            />

            <SubmitToVanThuModal
                show={showSubmitToVanThuModal}
                onClose={() => setShowSubmitToVanThuModal(false)}
            />

            <FileViewerModal
                show={showFileViewerModal}
                onClose={() => setShowFileViewerModal(false)}
                selectedFileUrl={selectedFileUrl}
            />

            <AddViewerToDispatchModal
                show={showAddViewerToDispatchModal}
                onClose={() => setShowAddViewerToDispatchModal(false)}
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
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Số văn bản:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.documentNumber}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Nơi nhận:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.receiveAddress}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Người ký:</p>
                                            <p className="body__left__1__content__left__field__result">{outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.signByUser?.fullName}</p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Ngày ký:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.signDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Số trang:</p>
                                            <p className="body__left__1__content__left__field__result">{outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.totalPage}</p>
                                        </div>
                                    </div>

                                    <div className="body__left__1__content__right">

                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Mức độ bảo
                                                mật:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.securityLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Mức độ khẩn
                                                cấp:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.urgencyLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Ngày hiệu lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.effectiveDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title" style={{width: '145px'}}>Ngày hết hiệu
                                                lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.expirationDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body__left__2">
                                <h2>Tệp đính kèm</h2>
                                <ul>
                                    {outGoingDispatchDetail?.attachments &&
                                    outGoingDispatchDetail?.attachments.map((item) => (
                                        // <li key={item.id} onClick={() => setShowFileViewerModal(true)}>
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
                                                <td>{index + 1}</td>
                                                <td>{moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                <td>{ACTION_ON_DISPATCH_META_DATA_KEYS[item.action?.actionName]}</td>
                                                <td>{item.user?.fullName}</td>
                                                <td>
                                                    {item?.metaData && Object.keys(item.metaData).map((key, keyIndex) =>
                                                        <div key={keyIndex}>{getMetaData(item.metaData, key)}</div>)
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
                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.documentType?.typeName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Vị trí lưu trữ</div>
                                <span className="body__right__field__result">
                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.storageLocation?.locationName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người xử lý</div>
                                <span className="body__right__field__result">
                                <ul>
                                    {
                                        renderProcessor()
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
                                {outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.createdByUser?.fullName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Ngày tạo</div>
                                <span className="body__right__field__result">
                                    {moment(outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                            </div>

                            {/*<div className="body__right__field">*/}
                            {/*    <div className="body__right__field__title">Người duyệt</div>*/}
                            {/*    <span className="body__right__field__result">*/}
                            {/*    {outGoingDispatchDetail?.approveBy}*/}
                            {/*</span>*/}
                            {/*</div>*/}

                            {/*<div className="body__right__field">*/}
                            {/*    <div className="body__right__field__title">Ngày duyệt</div>*/}
                            {/*    <span className="body__right__field__result">*/}
                            {/*    {outGoingDispatchDetail.outGoingDispatchResultNewDTO?.approveDate && moment(outGoingDispatchDetail.outGoingDispatchResultNewDTO?.approveDate).format('YYYY-MM-DD HH:mm:ss')}*/}
                            {/*    </span>*/}
                            {/*</div>*/}

                            {
                                outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.isPublished &&
                                <div className="body__right__field">
                                    <div className="body__right__field__title">Đường dẫn phát hành</div>
                                    <span className="body__right__field__result">
                                        <a href={publishedDispatchLink}>{publishedDispatchLink}</a>
                                    </span>
                                </div>
                            }

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người theo dõi</div>
                                <span className="body__right__field__result">
                                    {
                                        renderViewers()
                                    }
                                    {
                                        !removePermissionOfFollowerToDispatch() &&
                                        <p style={{cursor:'pointer', color: '#c88094'}} onClick={() => setShowAddViewerToDispatchModal(true)}>
                                            Thêm người theo dõi?
                                        </p>
                                    }
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default OutGoingDispatchDetail;