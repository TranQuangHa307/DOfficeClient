import React, { useState } from 'react';
import {Button, Form, Modal, Spinner} from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import { toast } from 'react-toastify';
import {OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS, ROLE_META_DATA_KEYS} from "../../../constants/app";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import countDispatchActions from "../../../actions/countDispatchActions";

const SubmitToVanThuModal = (props) => {
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
			dispatchId: outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.id,
		};

		dispatch(outGoingDispatchActions.sign(data))
			.then(() => {
				outGoingDispatchDetail.outGoingDispatchResultNewDTO.status = OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.trinhLanhDaoCoQuanKy;
				dispatch({
					type: 'OUT_GOING_DISPATCH_DETAIL_LOADED',
					payload: outGoingDispatchDetail,
				})
				dispatch(countDispatchActions.getCountDispatch());
				dispatch(comingDispatchActions.getDispatchStream(data.dispatchId));
				dispatch(outGoingDispatchActions.getOutGoingDispatchById(data.dispatchId));
				setInput({
					userId: '',
					content: '',
				});
				setSubmitting(false);
				toast.success('Ký duyệt thành công', { autoClose: 3000, hideProgressBar : true });
				props.onClose();
			})
			.catch(() => {
				setSubmitting(false);
				toast.error('Đã có lỗi xảy ra, vui lòng thử lại', { autoClose: 3000, hideProgressBar : true });
			});
	};

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận phê duyệt văn bản?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Chuyển tiếp</Form.Label>
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
											return role?.roleCode === ROLE_META_DATA_KEYS.vanThu;
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
						Phê duyệt
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default SubmitToVanThuModal;
