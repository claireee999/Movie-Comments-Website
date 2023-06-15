import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function LoginWindow(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validUser, setValidUser] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       await axios.post('http://localhost:5000/login',{username: username, password:password}).then(
            res => {
                props.setRefetch(!props.refetch);
                console.log(username, password);
                setValidUser(res.data);
                console.log(validUser);
            }
        )
        if (validUser === 'valid') {
            props.setUsername(username);
            navigate('/');
        } else{
            handleShowModal();
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="login-window">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Wrong username or password. Please try again.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginWindow;
