import React, {useState} from 'react';
import {Button, Form, InputGroup, Spinner} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone, faUnlockAlt, faUser} from '@fortawesome/free-solid-svg-icons';

import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import userActions from "../../../actions/userActions";


export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);
    const [error, setError] = React.useState({})

    const [input, setInput] = React.useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        description: '',
    });


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
            errorData.fullName = 'Không được để trống tên';
            isValid = false;
        }
        if (!input.userName) {
            errorData.userName = 'Không được để trống tên tài khoản';
            isValid = false;
        }
        if (!input.email) {
            errorData.email = 'Không được để trống email';
            isValid = false;
        }
        if (!input.password) {
            errorData.password = 'Không được để trống mật khẩu';
            isValid = false;
        }
        if (!input.confirmPassword) {
            errorData.confirmPassword = 'Không được để trống nhập lại mật khẩu';
            isValid = false;
        }
        if (!input.phone) {
            errorData.phone = 'Không được để trống số điện thoại';
            isValid = false;
        }
        // if (!input.description) {
        //     errorData.description = 'Không được để trống mô tả';
        //     isValid = false;
        // }
        if (input.password !== input.confirmPassword) {
            errorData.confirmPassword = 'Mật khẩu không khớp';
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
        const data = {};
        Object.keys(input).forEach((key) => {
            console.log(key, "--->", input[key]);
            if (key !== 'confirmPassword') {
                data[`${key}`] = input[key];
            }
        });
        dispatch(userActions.createUser(data))
            .then(() => {
                toast.success("Thêm mới người dùng thành công", {autoClose: 3000, hideProgressBar: true});
                history.push("/user");
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
        history.push(`/user`);
    }

    return (
        <>
            <Form className="mt-4" onSubmit={onSubmit}>
                <Form.Group id="fullName" className="mb-4">
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup>
                        {/*<InputGroup.Text>*/}
                        {/*  <FontAwesomeIcon icon={faUser} />*/}
                        {/*</InputGroup.Text>*/}
                        <Form.Control type="text" placeholder="Full Name" name='fullName' onChange={onChange}/>
                    </InputGroup>
                    {error.fullName && <span style={{color: 'red'}}>{error.fullName}</span>}
                </Form.Group>

                <Form.Group id="userName" className="mb-4">
                    <Form.Label>User Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser}/>
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="User Name" name='userName' onChange={onChange}/>
                    </InputGroup>
                    {error.userName && <span style={{color: 'red'}}>{error.userName}</span>}
                </Form.Group>

                <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="example@company.com" name='email'
                                      onChange={onChange}/>
                    </InputGroup>
                    {error.email && <span style={{color: 'red'}}>{error.email}</span>}
                </Form.Group>

                <Form.Group>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt}/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Password" name='password'
                                          onChange={onChange}/>
                        </InputGroup>
                        {error.password && <span style={{color: 'red'}}>{error.password}</span>}
                    </Form.Group>
                </Form.Group>

                <Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt}/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Password Confirmation"
                                          name='confirmPassword' onChange={onChange}/>
                        </InputGroup>
                        {error.confirmPassword && <span style={{color: 'red'}}>{error.confirmPassword}</span>}
                    </Form.Group>
                </Form.Group>

                <Form.Group id="email" className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faPhone}/>
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Phone Number" name='phone' onChange={onChange}/>
                    </InputGroup>
                    {error.phone && <span style={{color: 'red'}}>{error.phone}</span>}
                </Form.Group>

                <Form.Group id="description" className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder="Description" name='description' onChange={onChange}/>
                    </InputGroup>
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

                <Button style={{marginTop: '10px'}} variant="light" className="w-100" onClick={back}>
                    Quay lại
                </Button>
            </Form>
        </>
    )
}