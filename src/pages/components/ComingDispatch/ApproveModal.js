import React, { useState } from 'react';
import {Button, Modal, Spinner} from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import comingDispatchActions from '../../../actions/comingDispatchActions';
import { toast } from 'react-toastify';
import countDispatchActions from "../../../actions/countDispatchActions";

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
				dispatch(countDispatchActions.getCountDispatch());
				dispatch(comingDispatchActions.getComingDispatchById(dispatchId));
				dispatch(comingDispatchActions.getDispatchStream(dispatchId));
				setSubmitting(false);
				toast.success('Duyệt thành công', { autoClose: 3000, hideProgressBar : true });
				props.onClose();
			})
			.catch(() => {
				setSubmitting(false);
				toast.error('Có lỗi xảy ra trong quá trình duyệt', { autoClose: 3000, hideProgressBar : true });
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
					{
						submitting &&
						<Spinner
							style={{marginRight: '5px'}}
							animation="border"
							role="status"
							size="sm">
						</Spinner>
					}
					Duyệt
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ApproveModal;
