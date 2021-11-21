import {Button, Form, InputGroup} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faUnlockAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const AddComingDispatch = () => {
    return (
        <>
            <Form className="mt-4">
                <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="text" placeholder="example@company.com" name='email'/>
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Group id="password" className="mb-4">
                        <Form.Label>Your Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required type="password" placeholder="Password" name='password'/>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>

                <Form.Group>
                    <Form.Group id="passwordConfirmation" className="mb-4">
                        <Form.Label>Confirm Your Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required type="password" placeholder="Password Confirmation" name='passwordConfirmation'/>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>

                <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Full Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Full Name" name='fullName'/>
                    </InputGroup>
                </Form.Group>

                <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Phone Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faPhone} />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Phone Number" name='phone'/>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name='roleId'>
                        <option defaultValue>Select Role</option>
                        {/*{ fakeRole.map((v, i) => (<option key={i} value={v.id}>{ v.name }</option>)) }*/}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Add User
                </Button>
            </Form>
        </>
    );
}

export default AddComingDispatch;