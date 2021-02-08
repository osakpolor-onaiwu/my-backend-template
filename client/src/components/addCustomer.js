import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddCustomers from "../redux/action/addAction";
import { Row, Container, Col } from "react-materialize";

export const AddCustomer = ({ AddCustomers }) => {
    const initialState = {
        name: "",
        age: null,
    };

    const [state, setstate] = useState(initialState);

    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        AddCustomers(state);
    };
    return (
        <Container>
            <Row className="center">
                <form onSubmit={handleSubmit}>
                    <div className="input-field col s12 l6">
                        <input
                            type="text"
                            id="name"
                            className="validate"
                            onChange={handleChange}
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field col s12 l6">
                        <input
                            type="text"
                            id="age"
                            className="validate"
                            onChange={handleChange}
                        />
                        <label htmlFor="age">Age</label>
                    </div>
                    <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="action">
                        Add Customer
                    </button>
                </form>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        AddCustomers: (customer) => {
            dispatch(AddCustomers(customer));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
