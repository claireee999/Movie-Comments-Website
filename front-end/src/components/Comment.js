import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import RatingStars from "./RatingStars";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Col from "react-bootstrap/Col";

const Comment = (props) => {
    const [commentText, setCommentText] = useState(props.comment);
    const [rating, setRating] = useState(props.rating);
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props.id);
        await axios.post('http://localhost:5000/update_review',{username: props.username, mid: props.id, rating:rating * 2, comment:commentText}).then(
            res => {
                //props.setRefetch(true);
                props.setRefetch(!props.refetch);
            }
        )
        setIsEdit(false);
    };

    const changeToEdit = (e) => {
        e.preventDefault();
        setIsEdit(true);
    }
    const changeComment = (e) => {
        e.preventDefault();
        setCommentText(e.target.value);
    };

    return (
        <Card style={{textAlign: 'left'}}>
            <Card.Header>Comment</Card.Header>
            <Card.Body>
                {isEdit ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="comment-text">
                            <p column sm={2}>Username: {props.username}</p>
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
                            Confirm
                        </Button>
                    </Form>
                ) : (
                    <Form onSubmit={changeToEdit}>
                        <Form.Group controlId="comment-text">
                            <p column sm={2}>Username: {props.username}</p>
                            <Form.Label>Rating: </Form.Label>
                            <RatingStars rating={rating} setRating={setRating} edit={false}/>
                            <br />
                            <Form.Label>Comment: {props.comment}</Form.Label>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>
                )}
            </Card.Body>
        </Card>
    );
}
export default Comment;
