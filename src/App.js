// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";

// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import AppRootRoutes from "./common/routes/AppRootRoutes";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// -- Component Styles
import "./styles/app.scss";




const App = (props) => {
  return (
    <div>
      <HashRouter>
        <AppRootRoutes/>
        <ToastContainer theme="light"/>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
