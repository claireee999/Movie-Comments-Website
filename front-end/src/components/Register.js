import React, { useState } from 'react';
import {Form, Button, Modal, Alert} from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function RegisterWindow(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/');
    };
    const handleUsernameChange = async (e) => {
        console.log(usernameTaken, username);
        //e.preventDefault();
        axios.post('http://localhost:5000/check_username', {username: e.target.value})
            .then(
                res => {
                })
            .catch(
                error => {
                    setUsernameTaken(true);
                })
        setUsername(e.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value !== rePassword) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
        setPassword(event.target.value);
    };

    const handleRePasswordChange = (event) => {
        console.log(passwordMatch, event.target.value);
        if (event.target.value !== password) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
        setRePassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/register',{username: username, password:password})
            .then(
                res => {
                    handleShowModal();
                    props.setUsername(username);
                })
            .catch(
                error => {
                setUsername('');
                setPassword('');
                setRePassword('');
            })
    };

    return (
        <div className="login-window">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {usernameTaken && <Alert variant="danger">Username is already taken. Please choose a different one.</Alert>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword2">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter password"
                        value={rePassword}
                        onChange={handleRePasswordChange}
                    />
                    {!passwordMatch && <Alert variant="danger">Password does not match.</Alert>}
                </Form.Group>

                <Button variant="primary" type="submit" disabled={username === ''||password === ''||usernameTaken || !passwordMatch}>
                    Register
                </Button>
            </Form>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Registration successful!  <br /> Navigating to main page...</p>
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

export default RegisterWindow;
