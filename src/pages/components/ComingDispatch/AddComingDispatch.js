import {Button, Form, InputGroup, Spinner} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import userActions from "../../../actions/userActions";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';
import countDispatchActions from "../../../actions/countDispatchActions";

const AddComingDispatch = () => {

    const [submiting, setSubmiting] = useState(false);

    const [ input, setInput ] = React.useState({
        documentNumber: '',
        releaseDepartmentId: '',
        signBy: '',
        signDate: '',
        arrivalDate: '',
        documentTypeId: '',
        totalPage: '',
        securityLevel: '',
        urgencyLevel: '',
        effectiveDate: '',
        expirationDate: '',
        storageLocationId: '',
        mainContent: '',
        receiverId: '',
        attachments: [],
    });

    const [error, setError] = React.useState({})

    const dispatch = useDispatch();
    const history = useHistory();

    const {documentTypes} = useSelector((state) => state.documentType);
    const {storageLocations} = useSelector((state) => state.storageLocation);
    const {releaseDepartments} = useSelector((state) => state.releaseDepartment);
    const {users} = useSelector((state) => state.user);
    const {user} = useSelector(state => state.authentication);

    useEffect(() => {
        dispatch(comingDispatchActions.getAllDocumentType());
        dispatch(comingDispatchActions.getAllStorageLocation());
        dispatch(comingDispatchActions.getAllReleaseDepartment());
        dispatch(userActions.getAllUser());
    }, []);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name !== 'attachments') {
            setInput({ ...input, [name]: value });
        } else {
            setInput({ ...input, [name]: e.target.files });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errorData = {};
        let isValid = true;
        if (!input.documentNumber) {
            errorData.documentNumber = 'Không được để trống số văn bản';
            isValid = false;
        }
        if (!input.releaseDepartmentId) {
            errorData.releaseDepartmentId = 'Không được để trống nơi ban hành';
            isValid = false;
        }
        if (!input.documentTypeId) {
            errorData.documentTypeId = 'Không được để trống loại văn bản';
            isValid = false;
        }
        if (!input.mainContent) {
            errorData.mainContent = 'Không được để trống nội dung';
            isValid = false;
        }
        if (input.attachments.length <= 0) {
            errorData.attachments = 'Không được để trống tệp đính kèm';
            isValid = false;
        }
        if (!isValid) {
            setError(errorData);
            toast.error("Vui lòng điền đầy đủ các trường thông tin", { autoClose: 3000, hideProgressBar : true });
            return;
        }
        setError({});

        // submit...
        setSubmiting(true);
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            console.log(input[key]);
            if (key === 'attachments') {
                for (let i = 0; i < input[key].length; i++) {
                    formData.append(`${key}[${i}]`, input[key][i]);
                }
            } else {
                formData.append(key, input[key]);
            }
        });
        dispatch(comingDispatchActions.createDispatchByForm(formData))
            .then(() => {
                dispatch(countDispatchActions.getCountDispatch());
                toast.success("Thêm mới văn bản đến thành công", { autoClose: 3000, hideProgressBar : true });
                history.push("/coming-dispatch");
                setSubmiting(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Đã xảy ra lỗi. Vui lòng liên hệ quản trị viên để được hỗ trợ", { autoClose: 3000, hideProgressBar : true });
                setSubmiting(false);
            });
    }

    const back = () => {
        // window.location.href = '/coming-dispatch';
        history.push("/coming-dispatch");
    }

    return (
        <>
            <Form className="mt-4" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Số văn bản</Form.Label>
                    <Form.Control type="text" placeholder="Số văn bản" name="documentNumber" onChange={onChange}/>
                    {error.documentNumber && <span style={{color: 'red'}}>{error.documentNumber}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nơi ban hành</Form.Label>
                    <Form.Select name="releaseDepartmentId" onChange={onChange}>
                        <option>---Chọn nơi ban hành---</option>
                        {releaseDepartments.map((v, i) => (<option key={i} value={v.id}>{v.departmentName}</option>))}
                    </Form.Select>
                    {error.releaseDepartmentId && <span style={{color: 'red'}}>{error.releaseDepartmentId}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Người ký</Form.Label>
                    <Form.Control type="text" placeholder="Người ký" name="signBy" onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày ký</Form.Label>
                    <Form.Control type="date" placeholder="Ngày ký" name="signDate" onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày đến</Form.Label>
                    <Form.Control type="date" placeholder="Ngày đến" name="arrivalDate" onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Loại văn bản</Form.Label>
                    <Form.Select name="documentTypeId" onChange={onChange}>
                        <option>---Chọn loại văn bản---</option>
                        {documentTypes.map((v, i) => (<option key={i} value={v.id}>{v.typeName}</option>))}
                    </Form.Select>
                    {error.documentTypeId && <span style={{color: 'red'}}>{error.documentTypeId}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Số trang</Form.Label>
                    <Form.Control type="text" placeholder="Số trang" name="totalPage" onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mức độ bảo mật</Form.Label>
                    <Form.Select name="securityLevel" onChange={onChange}>
                        <option>---Mức độ bảo mật---</option>
                        <option value="1">Bình thường</option>
                        <option value="2">Cao</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mức độ khẩn cấp</Form.Label>
                    <Form.Select name="urgencyLevel" onChange={onChange}>
                        <option>---Mức độ khẩn cấp---</option>
                        <option value="1">Bình thường</option>
                        <option value="2">Cao</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày hiệu lực</Form.Label>
                    <Form.Control type="date" placeholder="Ngày hiệu lực" name="effectiveDate" onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày hết hiệu lực</Form.Label>
                    <Form.Control type="date" placeholder="Ngày hết hiệu lực" name="expirationDate" onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vị trí lưu trữ</Form.Label>
                    <Form.Select name="storageLocationId" onChange={onChange}>
                        <option>---Chọn vị trí lưu trữ---</option>
                        {storageLocations.map((v, i) => (<option key={i} value={v.id}> {v.locationName} </option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Trích yếu</Form.Label>
                    <Form.Control type="text" placeholder="Nhập nội dung" name="mainContent" onChange={onChange}/>
                    {error.mainContent && <span style={{color: 'red'}}>{error.mainContent}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Người nhận</Form.Label>
                    <Form.Select name="receiverId" onChange={onChange}>
                        <option>---Chọn người nhận---</option>
                        {users
                            .filter((item) => {
                                let isOk = true;
                                if (!item?.userEntity?.isActive) {
                                    isOk = false;
                                }
                                if (item?.userEntity?.id === user?.user?.id) {  // nếu là thằng đang login
                                    isOk = false;
                                }
                                return isOk;
                            })
                            .map((v, i) => (<option key={i} value={v.userEntity.id}>{v.userEntity.fullName}</option>))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Tệp đính kèm</Form.Label>
                    <Form.Control type="file" multiple name="attachments" onChange={onChange} />
                    {error.attachments && <span style={{color: 'red'}}>{error.attachments}</span>}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={submiting}>
                    {
                        submiting &&
                        <Spinner
                            style={{marginRight: '5px'}}
                            animation="border"
                            role="status"
                            size="sm">
                        </Spinner>
                    }
                    Lưu lại
                </Button>

            </Form>
            <Button style={{marginTop: '10px'}} variant="light" className="w-100" onClick={back}>
                Quay lại
            </Button>
        </>
    );
}

export default AddComingDispatch;