import React from "react";
import { connect } from "react-redux";
import DeleteCustomers from "../redux/action/deleteCustomer";
import UpdateCustomer from "../redux/action/update";

const Customers = ({ customers, DeleteCustomers, UpdateCustomer }) => {
    const eachCustomers = customers ? (
        customers.map((customer) => {
            return (
                <div key={customer._id} className="col s12 m6 l6">
                    <div className="card-panel transparent black-text">
                        <h5>
                            Name: {customer.name} age: {customer.age}
                        </h5>
                        <a
                            href="#"
                            onClick={() => DeleteCustomers(customer._id)}
                            className="red darken-4 white-text btn-flat">
                            Delete
                        </a>
                    </div>
                </div>
            );
        })
    ) : (
        <div>No customers</div>
    );

    return <div>{eachCustomers}</div>;
};

const mapStateToProps = (state) => ({
    customers: state.customers,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DeleteCustomers: (id) => {
            dispatch(DeleteCustomers(id));
        },
        UpdateCustomer: (id, update) => dispatch(UpdateCustomer(id, update)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
