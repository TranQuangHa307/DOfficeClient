import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import moment from "moment";
import {OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS} from "../../../constants/app";

const PublishedDispatchDetail = (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [publishedDispatch, setPublishedDispatch] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(outGoingDispatchActions.getPublishedDispatch(id))
            .then((result) => {
                setPublishedDispatch(result);
                setLoading(false);
            })
            .catch((err) => {
                history.push('/examples/404');
            })
    }, []);

    const processUrlAttachment = (url) => {
        return `http://localhost:8091/api${url}`;
    }

    const renderStatus = () => {
        const status = publishedDispatch?.outGoingDispatchResultNewDTO?.status;
        if (status === OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.daXuLy) {
            return "Đã xử lý";
        }
        return "Chưa xử lý";
    }

    const renderProcessor = () => {
        const processors = publishedDispatch?.processors;
        const processorsSet = [...new Map(processors?.map(v => [v?.processor?.id, v])).values()]  // Xử lí trùng lặp
        return processorsSet.map((item) => (
            <li key={item?.processor?.id}>
                {item?.processor?.fullName}
            </li>
        ))
    }

    return (
        <>
            {loading === true ? <div>Loading...</div> :
                <div className="mainContent">
                    <div className="nav">
                        <div className="nav__1">
                            {/*<Button variant="light" classemail="m-1 mb-4" onClick={back}>*/}
                            {/*    Quay lại*/}
                            {/*</Button>*/}
                        </div>
                        <div className="nav__2">

                            {/*{renderButtonGroup()}*/}

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
                                                {publishedDispatch?.outGoingDispatchResultNewDTO?.documentNumber}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Nơi nhận:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {publishedDispatch?.outGoingDispatchResultNewDTO?.receiveAddress}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Người ký:</p>
                                            <p className="body__left__1__content__left__field__result">{publishedDispatch?.outGoingDispatchResultNewDTO?.signByUser?.fullName}</p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Ngày ký:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(publishedDispatch?.outGoingDispatchResultNewDTO?.signDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Số trang:</p>
                                            <p className="body__left__1__content__left__field__result">{publishedDispatch?.outGoingDispatchResultNewDTO?.totalPage}</p>
                                        </div>
                                    </div>

                                    <div className="body__left__1__content__right">

                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Mức độ bảo
                                                mật:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {publishedDispatch?.outGoingDispatchResultNewDTO?.securityLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Mức độ khẩn
                                                cấp:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {publishedDispatch?.outGoingDispatchResultNewDTO?.urgencyLevel === 1 ? 'Bình thường' : 'Cao'}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Ngày hiệu lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(publishedDispatch?.outGoingDispatchResultNewDTO?.effectiveDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                        <div className="body__left__1__content__left__field">
                                            <p className="body__left__1__content__left__field__title">Ngày hết hiệu
                                                lực:</p>
                                            <p className="body__left__1__content__left__field__result">
                                                {moment(publishedDispatch?.outGoingDispatchResultNewDTO?.expirationDate).format('YYYY-MM-DD')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body__left__2">
                                <h2>Tệp đính kèm</h2>
                                <ul>
                                    {publishedDispatch?.attachments &&
                                    publishedDispatch?.attachments.map((item) => (
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
                                {/*<h2>Luồng văn bản</h2>*/}
                                {/*<Table striped bordered hover>*/}
                                {/*    <thead>*/}
                                {/*    <tr>*/}
                                {/*        <th>STT</th>*/}
                                {/*        <th>Thời gian thực hiện</th>*/}
                                {/*        <th>Hành động</th>*/}
                                {/*        <th>Người thực hiện</th>*/}
                                {/*        <th>Thông tin</th>*/}
                                {/*    </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*    {*/}
                                {/*        activityHistories.map((item, index) => (*/}
                                {/*            <tr key={index}>*/}
                                {/*                <td>{index + 1}</td>*/}
                                {/*                <td>{moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>*/}
                                {/*                <td>{ACTION_ON_DISPATCH_META_DATA_KEYS[item.action?.actionName]}</td>*/}
                                {/*                <td>{item.user?.fullName}</td>*/}
                                {/*                <td>{item?.metaData && Object.keys(item.metaData).map((key, keyIndex) =>*/}
                                {/*                    <div key={keyIndex}>{getMetaData(item.metaData, key)}</div>)}</td>*/}
                                {/*            </tr>*/}
                                {/*        ))*/}
                                {/*    }*/}
                                {/*    </tbody>*/}
                                {/*</Table>*/}
                            </div>
                        </div>
                        <div className="body__right">
                            <div className="body__right__field">
                                <div className="body__right__field__title">Loại văn bản</div>
                                <span className="body__right__field__result">
                                {publishedDispatch?.outGoingDispatchResultNewDTO?.documentType?.typeName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Vị trí lưu trữ</div>
                                <span className="body__right__field__result">
                                {publishedDispatch?.outGoingDispatchResultNewDTO?.storageLocation?.locationName}
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
                                {publishedDispatch?.outGoingDispatchResultNewDTO?.createdByUser?.fullName}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Ngày tạo</div>
                                <span className="body__right__field__result">
                                {moment(publishedDispatch?.outGoingDispatchResultNewDTO?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Người duyệt</div>
                                <span className="body__right__field__result">
                                {publishedDispatch?.approveBy}
                            </span>
                            </div>

                            <div className="body__right__field">
                                <div className="body__right__field__title">Ngày duyệt</div>
                                <span className="body__right__field__result">
                                {publishedDispatch?.outGoingDispatchResultNewDTO?.approveDate && moment(publishedDispatch.outGoingDispatchResultNewDTO?.approveDate).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            </div>

                            {/*<div className="body__right__field">*/}
                            {/*    <div className="body__right__field__title">Đường dẫn phát hành</div>*/}
                            {/*    <span className="body__right__field__result">*/}
                            {/*        { publishedDispatchLink && <a href={publishedDispatchLink}>{publishedDispatchLink}</a> }*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default PublishedDispatchDetail;
