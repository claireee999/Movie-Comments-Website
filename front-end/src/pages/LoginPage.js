import LoginWindow from "../components/Login";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";


function LoginPage(props) {
    const [refetch, setRefetch] = useState(false);
   /*
    const fetchData = async (url) => {
        await axios.get(url, {params: {id: location.state.id}}).then(
            res => {
            }
        )
    };

    useEffect(() => {
        fetchData('http://localhost:5000/login');
    }, [refetch]);

*/
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
            <LoginWindow username={props.username} setUsername={props.setUsername} refetch={refetch} setRefetch={setRefetch} />
            <Button variant="primary" type="submit" href='/register'>
               Register
            </Button>
        </div>
    );
}
export default LoginPage;