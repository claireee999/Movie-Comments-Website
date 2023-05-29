import Comment from "../components/Comment";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Row from "react-bootstrap/Row";
import AddComment from "../components/AddComment";
import Button from "react-bootstrap/Button";

function CommentPage() {
    let location = useLocation();
    const [comments, setComments] = useState([])
    const [refetch, setRefetch] = useState(false);
    const fetchData = async (url) => {
        await axios.get(url, {params: {id: location.state.id}}).then(
            res => {
                setComments(res.data);
            }
        )
    };

    useEffect(() => {
        fetchData('http://localhost:5000/comment');
    }, [refetch]);

    return (
        <div className="App">
            <Row style={{textAlign: 'center', display: 'block'}}>
                <h4>
                    Comments for {location.state.name}
                </h4>
            </Row>
            <Button variant="primary" type="submit" href='/'>
                Go Back
            </Button>
            <AddComment refetch={refetch} setRefetch={setRefetch} id={location.state.id}/>
            {
                comments && comments.map((value, index) => (
                    <div key={value}>
                        <Comment
                            username={value[0]}
                            rating={value[1]}
                            id={location.state.id}
                            comment={value[2]}
                            refetch={refetch}
                            setRefetch={setRefetch}
                        />
                    </div>
                ))
            }
        </div>


    );
}

export default CommentPage;
