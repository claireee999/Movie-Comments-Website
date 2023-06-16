import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

function UserPage(props) {
    console.log(props.username);
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
        </Container>
    );
}

export default UserPage;