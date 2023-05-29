import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RatingStars from "./RatingStars";
import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function AddComment(props) {
    const [commentText, setCommentText] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/add_review',{username: username, mid: props.id, rating:rating * 2, comment:commentText}).then(
            res => {
                //props.setRefetch(true);
                props.setRefetch(!props.refetch);
            }
        )
        setCommentText('');
        setUsername('');
        setRating(0);
    };

    const changeComment = (e) => {
        setCommentText(e.target.value);
    };

    const changeUsername = (e) => {
        setUsername(e.target.value)
    };

    return (
        <Card style={{textAlign: 'left'}}>
            <Card.Header>Add Comment</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Username:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={changeUsername}
                            />
                        </Col>

                    </Form.Group>
                    <Form.Group controlId="comment-text">
                        <Form.Label>Rating: </Form.Label>
                        <RatingStars rating={rating} setRating={setRating} edit={true}/>
                        <br />
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={commentText}
                            onChange={changeComment}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AddComment;
