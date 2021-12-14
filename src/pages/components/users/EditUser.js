import {Button, Form, InputGroup, Spinner} from "@themesberg/react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import userActions from "../../../actions/userActions";
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import moment from "moment";
import {AiOutlineDelete, TiDelete} from "react-icons/all";
import utils from "../../../utils";
import {JAVA_DATE_FORMAT} from "../../../constants/app";

const EditUser = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [input, setInput] = React.useState({
        fullName: '',
        email: '',
        phone: '',
        userName: '',
        password: '',
        description: '',
    });

    const [error, setError] = React.useState({})
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        dispatch(userActions.getEditingUserById(id))
            .then((result) => {
                const user = result?.userEntity ?? {};
                const inputData = {
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    userName: user.userName,
                    password: user.password,
                    description: user.description,
                }
                setInput(inputData);
                setLoading(false);
            })
    }, []);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({...input, [name]: value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errorData = {};
        let isValid = true;
        if (!input.fullName) {
            errorData.fullName = 'Không được để trống tên đầy đủ';
            isValid = false;
        }
        if (!input.phone) {
            errorData.phone = 'Không được để trống số điện thoại';
            isValid = false;
        }
        if (!isValid) {
            setError(errorData);
            toast.error("Vui lòng điền đầy đủ các trường thông tin", {autoClose: 3000, hideProgressBar: true});
            return;
        }
        setError({});

        // submit...
        setSubmiting(true);
        const data = {
            userId: id,
            fullName: input.fullName,
            phone: input.phone,
            description: input.description,
        };
        dispatch(userActions.updateUser(data))
            .then(() => {
                toast.success("Cập nhật thông tin user thành công", {autoClose: 3000, hideProgressBar: true});
                history.push(`/user/${id}`);
                setSubmiting(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Đã xảy ra lỗi. Vui lòng liên hệ quản trị viên để được hỗ trợ", {
                    autoClose: 3000,
                    hideProgressBar: true
                });
                setSubmiting(false);
            });
    }

    const back = () => {
        history.push(`/user/${id}`);
    }

    if (loading) {
        return <div style={{ width: '100%', textAlign: 'center' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>;
    }

    return (
        <>
            <Form className="mt-4" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên đầy đủ</Form.Label>
                    <Form.Control
                        value={input.fullName}
                        type="text"
                        placeholder="Tên đầy đủ"
                        name="fullName"
                        onChange={onChange}/>
                    {error.fullName && <span style={{color: 'red'}}>{error.fullName}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        disabled={true}
                        value={input.email}
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={onChange}/>
                    {error.email && <span style={{color: 'red'}}>{error.email}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        value={input.phone}
                        type="text"
                        placeholder="Số điện thoại"
                        name="phone"
                        onChange={onChange}/>
                    {error.phone && <span style={{color: 'red'}}>{error.phone}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tên tài khoản</Form.Label>
                    <Form.Control
                        disabled={true}
                        value={input.userName}
                        type="text"
                        placeholder="Tên tài khoản"
                        name="userName"
                        onChange={onChange}/>
                    {error.userName && <span style={{color: 'red'}}>{error.userName}</span>}
                </Form.Group>

                {/*<Form.Group className="mb-3">*/}
                {/*    <Form.Label>Mật khẩu</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        disabled={true}*/}
                {/*        value={input.password}*/}
                {/*        type="password"*/}
                {/*        placeholder="Mật khẩu"*/}
                {/*        name="password"*/}
                {/*        onChange={onChange}/>*/}
                {/*    {error.password && <span style={{color: 'red'}}>{error.password}</span>}*/}
                {/*</Form.Group>*/}

                <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                        value={input.description}
                        type="text"
                        placeholder="Mô tả"
                        name="description"
                        onChange={onChange}/>
                    {error.description && <span style={{color: 'red'}}>{error.description}</span>}
                </Form.Group>


                <Button variant="primary" type="submit" className="w-100" disabled={submiting}>
                    {
                        submiting &&
                        <Spinner
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

export default EditUser;