import LoginWindow from "../components/Login";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Link, useLocation} from "react-router-dom";


function LoginPage(props) {
    console.log(props);
    //console.log(props.setUsername);


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