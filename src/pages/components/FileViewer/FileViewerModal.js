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

	const summary = () => {

	}

	return (
		<Modal fullscreen={true} className="filePreviewModal" show={props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					{/*<Modal.Title>File Viewer</Modal.Title>*/}
					<Button type="button" variant="secondary">
						<a href={filePath}>Tải xuống</a>
					</Button>
					<Button type="button" variant="secondary" onClick={summary} style={{marginLeft : '10px'}}>
						Tóm tắt
					</Button>
				</Modal.Header>
				<Modal.Body>
					{/*<FileViewer fileType={abc && abc[abc.length - 1].toLowerCase()} filePath={filePath}/>*/}
					<embed src={filePath} type="application/pdf" style={{width: 'calc(100vw - 32px)', height: 'calc(100% - 8px)'}}/>
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
