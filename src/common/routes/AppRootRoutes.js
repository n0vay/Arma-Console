// -- React and related libs
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

// -- Redux
import { connect, useDispatch} from "react-redux"

// -- Custom Components
import LayoutComponent from "../../components/Layout/Layout";
import ErrorPage from "../../error/components/ErrorPage";
import Login from "../../auth/components/login/Login";
import Register from "../../auth/components/register/Register";

// -- Redux Actions
import { logoutUser } from "../../auth/redux/actions/auth";

// -- Services
import isAuthenticated from "../../auth/services/authService";
import { RouteConstants } from './RouteConstants';

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
    dispatch(logoutUser());
    return (<Redirect to="/login" />)
  } else {
    return (
      <Route { ...rest } render={props => (React.createElement(component, props))} />
    );
  }
};

/**
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
 const AppRootRoutes = (props) => (
   
    <Switch>
        <Switch>
          <Route path= {RouteConstants.HOME} exact render={() => <Redirect to={RouteConstants.PATIENT_LIST} />} />
          <Route path={RouteConstants.TEMPLATE} exact render={() => <Redirect to={RouteConstants.PATIENT_LIST}/>}/>
          <PrivateRoute path={RouteConstants.TEMPLATE} dispatch={useDispatch} component={LayoutComponent} />
          <Route path={RouteConstants.LOGIN} exact component={Login} />
          <Route path={RouteConstants.ERROR} exact component={ErrorPage} />
          <Route path={RouteConstants.REGISTER} exact component={Register} />
          <Route component={ErrorPage}/>
          <Route path='*' exact={true} render={() => <Redirect to={RouteConstants.ERROR} />} />
        </Switch>
    </Switch>
);

export default AppRootRoutes;