import { React, useState } from "react";
import Slider from "./Slider";
import { Navbar, Nav, NavDropdown, Form ,Row} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";

const Filter = (props) => {
    const order = ['Rating High to Low', 'Rating Low to High']
    const changeOrder = (e) => {
        const val = e.target.innerHTML;
        props.setOrder(val);
    };

    const displayTopN = (e) => {
        if (e.target.value == '') {
            props.setNum(250);
        } else if (e.target.value !== '') {
        //console.log(e.target.value);
            props.setNum(e.target.value);
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Filters</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Slider value={props.value} setValue={props.setValue}></Slider>
                    <Form>
                        <Form.Group>
                            <Form.Label>Show Top </Form.Label>
                            <Form.Control type="number" min="0" step="1" placeholder="Enter number" defaultValue="" onChange={displayTopN} />
                            <Form.Label> Movies </Form.Label>
                        </Form.Group>
                    </Form>

                    <NavDropdown title={`Order By: ${props.order}`} id="order-dropdown">
                        {order.map((item, index) =>
                            <NavDropdown.Item key={index} onClick={changeOrder}>{item}</NavDropdown.Item>
                        )}
                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>

        </Navbar>

    );
};

export default Filter;