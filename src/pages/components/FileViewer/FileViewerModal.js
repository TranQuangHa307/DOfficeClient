import React from 'react';
import {Button, Modal} from '@themesberg/react-bootstrap';
import FileViewer from 'react-file-viewer';

const FileViewerModal = (props) => {
	const handleClose = () => {
		props.onClose();
	};

	const filePath = props.selectedFileUrl;
	const abc = filePath?.split('.');
	console.log(filePath)
	console.log(abc)

	return (
		<Modal fullscreen={true} className="filePreviewModal" show={props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>File Viewer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FileViewer fileType={abc && abc[1].toLowerCase()} filePath={filePath}/>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" variant="secondary" onClick={handleClose}>
						Đóng
					</Button>
				</Modal.Footer>
		</Modal>
	);
};

export default FileViewerModal;
