import React, { useState } from 'react';
import { Button, Form, Modal } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import { toast } from 'react-toastify';

const ForwardModal = (props) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		userId: '',
		content: '',
	});
	const [error, setError] = useState({
		userId: '',
		content: '',
	});
	const [submitting, setSubmitting] = useState(false);

	const { users } = useSelector(state => state.user);
	const { comingDispatchDetail } = useSelector(state => state.comingDispatch);

	const handleClose = () => {
		props.onClose();
	};

	const onChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errorMsg = {
			userId: '',
			content: '',
		};
		let isValid = true;

		if (!input.userId) {
			isValid = false;
			errorMsg.userId = 'Không được để trống người tiếp nhận';
		}
		if (!input.content) {
			isValid = false;
			errorMsg.content = 'Không được để trống nội dung';
		}

		if (!isValid) {
			setError(errorMsg);
			return;
		}

		// submit
		setSubmitting(true);
		setError({
			userId: '',
			reason: '',
		});
		const data = {
			...input,
			officialDispatchId: comingDispatchDetail?.comingDispatchResultDTO?.id,
		};

		dispatch(comingDispatchActions.forward(data))
			.then(() => {
				dispatch(comingDispatchActions.getDispatchStream(data.officialDispatchId));
				setInput({
					userId: '',
					reason: '',
				});
				setSubmitting(false);
				toast.success('Chuyển tiếp thành công', { autoClose: 3000, hideProgressBar : true });
				props.onClose();
			})
			.catch(() => {
				setSubmitting(false);
				toast.error('Có lỗi xảy ra trong quá trình chuyển tiếp', { autoClose: 3000, hideProgressBar : true });
			});
	};

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Chuyển tiếp văn bản đến</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Chọn người tiếp nhận</Form.Label>
						<Form.Select
							name="userId"
							onChange={onChange}
							value={input.userId}
						>
							<option>---Chọn người tiếp nhận---</option>
							{users.map((v, i) => (<option key={i} value={v.userEntity.id}>{v.userEntity.fullName}</option>))}
						</Form.Select>
						{error.userId && <span style={{ color: 'red' }}>{error.userId}</span>}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Nội dung</Form.Label>
						<Form.Control
							type="textarea"
							placeholder="Nội dung"
							name="content"
							value={input.content}
							onChange={onChange}
						/>
						{error.content && <span style={{ color: 'red' }}>{error.content}</span>}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" variant="secondary" onClick={handleClose}>
						Hủy
					</Button>
					<Button type="submit" variant="primary" disabled={submitting}>
						Chuyển tiếp
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default ForwardModal;
