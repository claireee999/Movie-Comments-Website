import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

function UserPage(props) {
    const navigate = useNavigate();
    console.log(props.username);

    const handleLogOut = () => {
        props.setUsername(null);
        navigate('/');
    };

    return (
        <Container>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Information</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {props.username}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> john.doe@example.com
                            </Card.Text>
                            <Card.Text>
                                <strong>Phone:</strong> 123-456-7890
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Button variant="primary" type="submit" href='/'>
                Go Back
            </Button>
            <Button variant="primary" onClick={handleLogOut}>
                Log out
            </Button>
        </Container>
    );
}

export default UserPage;