import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Spinner} from '@themesberg/react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import roleActions from "../../../actions/roleActions";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import userActions from "../../../actions/userActions";

const ActivateUserModal = (props) => {
	const dispatch = useDispatch();
    const history = useHistory();
	const [submitting, setSubmitting] = useState(false);

	const handleClose = () => {
		props.onClose();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// submit
		setSubmitting(true);
		dispatch(userActions.activateUser(props.userId))
			.then(() => {
				dispatch(userActions.getUserById(props.userId));
				toast.success("Activate tài khoản thành công", { autoClose: 3000, hideProgressBar : true });
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
					<Modal.Title>Kích hoạt tài khoản</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có chắn chắn bạn thực sự muốn kích hoạt lại tài khoản này?
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" variant="secondary" onClick={handleClose}>
						Hủy
					</Button>
					<Button type="submit" variant="primary" disabled={submitting}>
						{
							submitting &&
							<Spinner
								animation="border"
								role="status"
								size="sm">
							</Spinner>
						}
						Activate
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default ActivateUserModal;
