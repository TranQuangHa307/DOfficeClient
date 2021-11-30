import React, { useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import { toast } from 'react-toastify';

const ApproveModal = (props) => {
	const dispatch = useDispatch();
	const [submitting, setSubmitting] = useState(false);

	const { comingDispatchDetail } = useSelector(state => state.comingDispatch);

	const handleClose = () => {
		props.onClose();
	};

	const handleSubmit = (e) => {
		// submit
		setSubmitting(true);
		const dispatchId = comingDispatchDetail?.comingDispatchResultDTO?.id;
		dispatch(comingDispatchActions.approve(dispatchId))
			.then(() => {
				dispatch(comingDispatchActions.getDispatchStream(dispatchId));
				setSubmitting(false);
				toast.success('Duyệt thành công');
				props.onClose();
			})
			.catch(() => {
				setSubmitting(false);
				toast.error('Có lỗi xảy ra trong quá trình duyệt');
			});
	};

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Duyệt văn bản đến</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Bạn có chắc chắn duyệt văn bản đến này?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button type="button" variant="secondary" onClick={handleClose}>
					Hủy
				</Button>
				<Button type="submit" variant="primary" disabled={submitting} onClick={handleSubmit}>
					Duyệt
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ApproveModal;
