import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";
import "./main.css";
import Reducer from "./redux/reducer/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(Reducer, applyMiddleware(thunk.withExtraArgument()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
