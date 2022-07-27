// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";

// -- Component Styles
import s from "./Layout.module.scss";
import SidebarArma from "../Sidebar/SidebarArma";
import PatientsList from "../../patients/components/list/PatientsList";
import { RouteConstants } from "../../common/routes/RouteConstants";
import PatientsCreateComponenet from "../../patients/components/create/PatientsCreateComponent";
import PatientsListMuiDatatable from "../../patients/components/list/PatientsListMuiDatatable";

const Layout = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <SidebarArma />
        <main className={s.content}>
          <Breadcrumbs url={props.location.pathname} />
          <Switch>
            <Route path={RouteConstants.TEMPLATE} exact render={() => <Redirect to={RouteConstants.PatientsList}/>} />
            <Route path={RouteConstants.PATIENT_LIST} exact component={PatientsListMuiDatatable}/>
            <Route path={RouteConstants.PATIENT_CREATE} exact component={PatientsCreateComponenet}/>
            <Route path='*' exact render={() => <Redirect to={RouteConstants.PatientsList} />} />
        </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
