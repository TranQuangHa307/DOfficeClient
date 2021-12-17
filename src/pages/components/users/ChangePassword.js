import React, {useState} from "react";
import {Button, Form, InputGroup, Spinner} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faUnlockAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import userActions from "../../../actions/userActions";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const ChangePassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [submiting, setSubmiting] = useState(false);
    const [error, setError] = React.useState({})

    const [input, setInput] = React.useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({...input, [name]: value});
    }

    // useEffect(() => {
    //
    // }, []);
    const onSubmit = (e) => {
        e.preventDefault();
        const errorData = {};
        let isValid = true;
        if (!input.currentPassword) {
            errorData.currentPassword = 'Không được để trống mật khẩu cũ';
            isValid = false;
        }
        if (!input.newPassword) {
            errorData.newPassword = 'Không được để trống mật khẩu mới';
            isValid = false;
        }
        if (!input.confirmPassword) {
            errorData.confirmPassword = 'Không được để trống nhập lại mật khẩu mới';
            isValid = false;
        }
        if (input.newPassword !== input.confirmPassword) {
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
            data[`${key}`] = input[key];
        });
        dispatch(userActions.changePassword(data))
            .then(() => {
                toast.success("Thay đổi mật khẩu thành công", {autoClose: 3000, hideProgressBar: true});
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
        history.push(`/`);
    }

    return (
        <>
            <h2>Thay đổi mật khẩu</h2>
            <Form className="mt-4" onSubmit={onSubmit}>

                <Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Mật khẩu cũ</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt}/>
                            </InputGroup.Text>
                            <Form.Control type="password" name='currentPassword' onChange={onChange}/>
                        </InputGroup>
                        {error.currentPassword && <span style={{color: 'red'}}>{error.currentPassword}</span>}
                    </Form.Group>
                </Form.Group>

                <Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt}/>
                            </InputGroup.Text>
                            <Form.Control type="password" name='newPassword' onChange={onChange}/>
                        </InputGroup>
                        {error.newPassword && <span style={{color: 'red'}}>{error.newPassword}</span>}
                    </Form.Group>
                </Form.Group>

                <Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt}/>
                            </InputGroup.Text>
                            <Form.Control type="password" name='confirmPassword' onChange={onChange}/>
                        </InputGroup>
                        {error.confirmPassword && <span style={{color: 'red'}}>{error.confirmPassword}</span>}
                    </Form.Group>
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
    );
}

export default ChangePassword;