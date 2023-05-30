import LoginWindow from "../components/Login";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import { Form, Button } from 'react-bootstrap';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform registration logic here
        console.log('Username:', username);
        console.log('Password:', password);
        // Reset form fields
        setUsername('');
        setPassword('');
    };

    return (
        <div className="register-page">
            <Button variant="primary" type="submit" href='/login'>
                Go Back
            </Button>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
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
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default RegisterPage;