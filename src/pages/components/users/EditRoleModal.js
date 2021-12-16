import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Spinner} from '@themesberg/react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import roleActions from "../../../actions/roleActions";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import userActions from "../../../actions/userActions";

const EditRoleModal = (props) => {
	const dispatch = useDispatch();
    const history = useHistory();
	const [submitting, setSubmitting] = useState(false);

	const {loading, roles, roleOfUser} = useSelector(state => state.role);
	const { userDetail } = useSelector(state => state.user);

	const {checked ,setChecked} = useState(false);

	const handleClose = () => {
		props.onClose();
	};

	const iniChecked = () => {
		setChecked(!checked);
	}

	useEffect(() => {
		dispatch(roleActions.getAllRole());
		// dispatch(roleActions.getAllRoleOfUser(props.userId))
        //     .then((result) => {
		//
        //     });
	}, []);

    let roleMap = new Map();

	const onChange = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        console.log(name, "--->", checked);
        roleMap.set(name, checked);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        console.log(roleMap);
        const roleId = [];
        roleMap.forEach((k, v) => {
            console.log(k, "-->", v);
            if (k === true) {
                roleId.push(v);
            }
        })
        const data = {};
        data.userId = props.userId;
        data.listRole = roleId;
        console.log(roleId);
		// submit
		if (!roleId.length) {
			toast.error("Không được để trống vai trò", { autoClose: 3000, hideProgressBar : true });
			return;
		}
		setSubmitting(true);
        dispatch(roleActions.addRoleForUser(data))
            .then(() => {
				dispatch(userActions.getUserById(props.userId));
                toast.success("Cập nhật Role thành công", { autoClose: 3000, hideProgressBar : true });
                history.push(`/user/${props.userId}`);
                setSubmitting(false);
				props.onClose();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Đã xảy ra lỗi. Vui lòng liên hệ quản trị viên để được hỗ trợ", { autoClose: 3000, hideProgressBar : true });
                setSubmitting(false);
            })
	};

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Chỉnh sửa vai trò</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					{/*{*/}
					{/*	roles.map((role, index) => (*/}
					{/*		<div>*/}
					{/*			<Form.Check.Input name={role?.id} type="checkbox" onChange={onChange}/>*/}
					{/*			<Form.Check.Label style={{marginLeft : '10px'}}>{role?.roleName}</Form.Check.Label>*/}
					{/*		</div>*/}
					{/*	))*/}
					{/*}*/}

                    {
                        roles.map((role, index) => {
                            const check = userDetail?.roles?.find(item => item?.id === role?.id);
                            if (check) {  // nếu có --> checked= true
                                roleMap.set(role?.id, true);
                                return (
                                    <div>
                                        <Form.Check.Input defaultChecked={true} name={role?.id} type="checkbox" onChange={onChange}/>
                                        <Form.Check.Label style={{marginLeft : '10px'}}>{role?.roleName}</Form.Check.Label>
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <Form.Check.Input name={role?.id} type="checkbox" onChange={onChange}/>
                                        <Form.Check.Label style={{marginLeft : '10px'}}>{role?.roleName}</Form.Check.Label>
                                    </div>
                                )
                            }
                        })
                    }


					{/*<div>*/}
					{/*	<Form.Check.Input type="checkbox"/>*/}
					{/*	<Form.Check.Label style={{marginLeft : '10px'}}>123</Form.Check.Label>*/}
					{/*</div>*/}


				</Modal.Body>
				<Modal.Footer>
					<Button type="button" variant="secondary" onClick={handleClose}>
						Hủy
					</Button>
					<Button type="submit" variant="primary" disabled={submitting}>
						{
							submitting &&
							<Spinner
								style={{marginRight: '5px'}}
								animation="border"
								role="status"
								size="sm">
							</Spinner>
						}
						Lưu lại
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default EditRoleModal;
