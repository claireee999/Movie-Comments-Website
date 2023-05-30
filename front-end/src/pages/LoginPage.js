import LoginWindow from "../components/Login";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Link, useLocation} from "react-router-dom";


function LoginPage() {
    let location = useLocation();
    console.log(location.state);
   // const { username, setUsername } = location.state;
    const username = location.state.username;
    const setUsername = location.state.setUsername;


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
            <LoginWindow username={username} setUsername={setUsername}/>
            <Button variant="primary" type="submit" href='/register'>
               Register
            </Button>
        </div>
    );
}
export default LoginPage;