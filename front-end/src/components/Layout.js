import React, {useEffect, useState} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";

const Layout = (props) => {
    return (
        <>
            <Row style={{textAlign: 'center', display: 'block'}}>
                <h4>
                    Movies
                </h4>
            </Row>

            <Table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Length</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.data && props.data.map((value, index) => (
                        <tr>
                            <td><Link to="/comments" state={{id: value[0], name: value[1]}}>{value[1]}</Link></td>
                            <td>{value[2]}</td>
                            <td>{value[3]}</td>
                            <td>{value[4]}</td>

                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </>
    );
}

export default Layout;
