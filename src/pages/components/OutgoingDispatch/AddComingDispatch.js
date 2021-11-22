import {Button, Form, InputGroup} from "@themesberg/react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import comingDispatchActions from "../../../actions/comingDispatchActions";
import userActions from "../../../actions/userActions";
import {useHistory} from "react-router-dom";

const AddComingDispatch = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {documentTypes} = useSelector((state) => state.documentType);
    const {storageLocations} = useSelector((state) => state.storageLocation);
    const {users} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(comingDispatchActions.getAllDocumentType());
        dispatch(comingDispatchActions.getAllStorageLocation());
        dispatch(userActions.getAllUser());
    }, []);

    const back = () => {
        // window.location.href = '/coming-dispatch';
        history.push("/coming-dispatch");  // dung cach nay
    }

    return (

        <>
            <Form className="mt-4">
                <Form.Group className="mb-3">
                    <Form.Label>Số văn bản</Form.Label>
                    <Form.Control type="text" placeholder="Số văn bản"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nơi gửi</Form.Label>
                    <Form.Control type="text" placeholder="Nơi gửi"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Người ký</Form.Label>
                    <Form.Control type="text" placeholder="Người ký"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày ký</Form.Label>
                    <Form.Control type="date" placeholder="Ngày ký"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày đến</Form.Label>
                    <Form.Control type="date" placeholder="Ngày đến"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Loại văn bản</Form.Label>
                    <Form.Select>
                        {documentTypes.map((v, i) => (<option key={i} value={v.id}>{v.typeName}</option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Số trang</Form.Label>
                    <Form.Control type="text" placeholder="Số trang"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mức độ bảo mật</Form.Label>
                    <Form.Select name="securityLevel">
                        <option value="1">Bình thường</option>
                        <option value="2">Cao</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mức độ khẩn cấp</Form.Label>
                    <Form.Select>
                        <option value="1">Bình thường</option>
                        <option value="2">Cao</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày hiệu lực</Form.Label>
                    <Form.Control type="date" placeholder="Ngày hiệu lực"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày hết hiệu lực</Form.Label>
                    <Form.Control type="date" placeholder="Ngày hết hiệu lực"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vị trí lưu trữ</Form.Label>
                    <Form.Select>
                        {storageLocations.map((v, i) => (<option key={i} value={v.id}> {v.locationName} </option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Trích yếu</Form.Label>
                    <Form.Control type="text" placeholder="Nhập nội dung"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Người nhận</Form.Label>
                    <Form.Select>

                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Tệp đính kèm</Form.Label>
                    <Form.Control type="file" multiple/>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Lưu lại
                </Button>

            </Form>
            <Button variant="primary" className="w-100" onClick={back}>
                Quay lại
            </Button>
        </>
    );
}

export default AddComingDispatch;