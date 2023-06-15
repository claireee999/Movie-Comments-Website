import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom";

const User = (props) => {
    if (props.username == null) {
        return (
            <Form>
                <Row style={{textAlign: 'Right', display:'block'}}>

                    <Link to="/login">
                        {props.username ?? 'Login'}
                    </Link>
                </Row>
            </Form>
        );
    } else {
        return (
            <Form>
                <Row style={{textAlign: 'Right', display:'block'}}>
                    <Link to="/user" username={props.username}>
                        {props.username ?? 'Login'}
                    </Link>
                </Row>
            </Form>
        );
    }

}
export default User;