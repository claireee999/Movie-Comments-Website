import RegisterWindow from "../components/Register";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import { Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import Register from "../components/Register";

function RegisterPage(props) {
    return (
        <div className="register-page">
            <Button variant="primary" type="submit" href='/'>
                Go Back
            </Button>
            <Row style={{textAlign: 'center', display: 'block'}}>
                <h4>
                    Register
                </h4>
            </Row>
            <RegisterWindow username={props.username} setUsername={props.setUsername}/>
        </div>

    );
}
export default RegisterPage;