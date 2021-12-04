import React, { useState } from 'react';
import {Button, Form, Modal, Spinner} from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import { toast } from 'react-toastify';
import {OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS, ROLE_META_DATA_KEYS} from "../../../constants/app";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";

const SubmitToUnitLeadershipModal = (props) => {
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
	const { outGoingDispatchDetail } = useSelector(state => state.outGoingDispatch);

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
			content: '',
		});
		const data = {
			...input,
			officialDispatchId: outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.id,
		};

		dispatch(outGoingDispatchActions.submitToUnitLeadership(data))
			.then(() => {
				outGoingDispatchDetail.outGoingDispatchResultNewDTO.status = OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoDonViKy;
				dispatch({
					type: 'OUT_GOING_DISPATCH_DETAIL_LOADED',
					payload: outGoingDispatchDetail,
				})
				dispatch(comingDispatchActions.getDispatchStream(data.officialDispatchId));
				setInput({
					userId: '',
					content: '',
				});
				setSubmitting(false);
				toast.success('Trình ký thành công');
				props.onClose();
			})
			.catch(() => {
				setSubmitting(false);
				toast.error('Đã có lỗi xảy ra, vui lòng thử lại');
			});
	};

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Trình lãnh đạo đơn vị</Modal.Title>
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
							{
								users
									.filter((user, index) => {
										return user.roles.some((role) => {
											return role?.roleCode === ROLE_META_DATA_KEYS.unitLeadership;
										})
									})
									.map((v, i) => (<option key={i} value={v.userEntity.id}>{v.userEntity.fullName}</option>))
							}
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
						{
							submitting &&
							<Spinner
								animation="border"
								role="status"
								size="sm">
							</Spinner>
						}
						Trình ký
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default SubmitToUnitLeadershipModal;
