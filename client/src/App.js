import React, { useEffect } from "react";
import Home from "./components/home";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { connect } from "react-redux";
import GetCustomers from "./redux/action/getCustomer";

const App = ({ GetCustomers }) => {
    useEffect(() => {
        GetCustomers();
    }, []);
    return (
        <HashRouter>
            <Navbar />
            <Switch>
                <Route to="/" component={Home} />
            </Switch>
            <Footer />
        </HashRouter>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        GetCustomers: () => {
            dispatch(GetCustomers());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
