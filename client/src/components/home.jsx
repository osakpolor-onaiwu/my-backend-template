import React from "react";
import { connect } from "react-redux";
import AddCustomer from "./addCustomer";
import Customers from './customers'
import { Container, Row, Col } from "react-materialize";

export const Home = () => {
 
    return (
        <div>
            <AddCustomer />
            <Container>
                <Row><Customers/></Row>
            </Container>
        </div>
    );
};




export default Home;
