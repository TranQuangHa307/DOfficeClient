import React, { useState } from 'react';
import {Button, Form, Modal, Spinner} from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import { toast } from 'react-toastify';
import {OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS, ROLE_META_DATA_KEYS} from "../../../constants/app";
import outGoingDispatchActions from "../../../actions/outGoingDispatchActions";
import countDispatchActions from "../../../actions/countDispatchActions";

const RejectDispatchModal = (props) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		reason: '',
	});
	const [error, setError] = useState({
		reason: '',
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
			reason: '',
		};
		let isValid = true;

		if (!input.reason) {
			isValid = false;
			errorMsg.reason = 'Không được để trống lí do';
		}

		if (!isValid) {
			setError(errorMsg);
			return;
		}

		// submit
		setSubmitting(true);
		setError({
			reason: '',
		});
		const data = {
			...input,
			dispatchId: outGoingDispatchDetail?.outGoingDispatchResultNewDTO?.id,
		};

		dispatch(outGoingDispatchActions.reject(data))
			.then(() => {
				outGoingDispatchDetail.outGoingDispatchResultNewDTO.status = OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS.chuaXuLy;
				dispatch({
					type: 'OUT_GOING_DISPATCH_DETAIL_LOADED',
					payload: outGoingDispatchDetail,
				})
				dispatch(countDispatchActions.getCountDispatch());
				dispatch(comingDispatchActions.getDispatchStream(data.dispatchId));
				dispatch(outGoingDispatchActions.getOutGoingDispatchById(data.dispatchId));
				setInput({
					reason: '',
				});
				setSubmitting(false);
				toast.success('Từ chối văn bản thành công', { autoClose: 3000, hideProgressBar : true });
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
					<Modal.Title>Xác nhận từ chối văn bản này?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Lí do</Form.Label>
						<Form.Control
							type="textarea"
							placeholder="Lí do"
							name="reason"
							value={input.reason}
							onChange={onChange}
						/>
						{error.reason && <span style={{ color: 'red' }}>{error.reason}</span>}
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
						Xác nhận
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default RejectDispatchModal;
