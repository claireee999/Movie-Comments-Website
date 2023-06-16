import LoginWindow from "../components/Login";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";


function LoginPage(props) {

    return (
        <div className="LoginPage">
            <Button variant="primary" type="submit" href='/'>
                Go Back
            </Button>
            <Row style={{textAlign: 'center', display: 'block'}}>
                <h4>
                    Login
                </h4>
            </Row>
            <LoginWindow username={props.username} setUsername={props.setUsername}/>
            <Button variant="primary" type="submit" href='/register'>
               Register
            </Button>
        </div>
    );
}
export default LoginPage;