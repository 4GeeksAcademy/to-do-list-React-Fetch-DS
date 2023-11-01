//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//import your own components
import App from "./component/App.jsx";

//render your react application
ReactDOM.render(<App />, document.querySelector("#app"));