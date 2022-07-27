import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
  Container,
  FormGroup,
  FormText,
  Input,
  Button,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";

// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import MUIDataTable from "mui-datatables";

import s from "./PatientsCreate.module.scss";
import PatientService from "../../services/patientService.js";
import { RouteConstants } from "../../../common/routes/RouteConstants.js";
const PatientsCreateComponenet = function (props) {
  const [state, setState] = useState({ email: '', password: '',first_name:'',last_name:'',phone:'',errMsg:''} )

  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  

  const doRegisterPatient = (event) => {
    event.preventDefault();
    // props.dispatch(registerUser({
    //   creds: state,
    //   history: props.history,
    // }))

    new PatientService().registerPatient(state).then((response) => {
      if (response.status == 200 || response.status == 201) {
        props.history.push(RouteConstants.PATIENT_LIST);
      }
    }).catch((error) => {
      const msg = error.response.data.error.details[0].message
      setState({ ...state, errMsg: msg })
      // console.log(msg);
      toast.error(msg,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  const { from } = props.location.state || { from: { pathname: RouteConstants.TEMPLATE } }

  // if (hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
  //   return (
  //     <Redirect to={from} />
  //   );
  // }

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2"></div>
                 
                </div>
                <div className="widget-table-overflow">
                
                  <div className="">
                    <Container className="col-12">
                      <Row className="d-flex align-items-center">
                        <Col xs={12} lg={6} className="left-column">
                          {/* <Widget className="widget-auth widget-p-lg"> */}
                            <div className="d-flex align-items-center justify-content-between py-3">
                              <p className="auth-header mb-0">Create Patient</p>
                              <div className="logo-block">
                                <p className="mb-0">Arma</p>
                              </div>
                            </div>
                            <div className="auth-info my-2">
                              <p>{state.errMsg}</p>
                            </div>
                            <form onSubmit={(event => doRegisterPatient(event))}>
                            <FormGroup className="my-3">
                                <FormText>First Name</FormText>
                                <Input
                                  id="first_name"
                                  className="input-transparent pl-3"
                                  value={state.first_name}
                                  onChange={(event) => changeCred(event)}
                                  type="text"
                                  required
                                  name="first_name"
                                  placeholder="Henry"
                                />
                              </FormGroup>
                              <FormGroup className="my-3">
                                <FormText>Last Name</FormText>
                                <Input
                                  id="last_name"
                                  className="input-transparent pl-3"
                                  value={state.last_name}
                                  onChange={(event) => changeCred(event)}
                                  type="text"
                                  required
                                  name="last_name"
                                  placeholder="Monk"
                                />
                              </FormGroup>
                              <FormGroup className="my-3">
                                <FormText>Email</FormText>
                                <Input
                                  id="email"
                                  className="input-transparent pl-3"
                                  value={state.email}
                                  onChange={(event) => changeCred(event)}
                                  type="email"
                                  required
                                  name="email"
                                  placeholder="Henry.Monk@gmail.com"
                                />
                              </FormGroup>
                              <FormGroup className="my-3">
                                <FormText>Phone</FormText>
                                <Input
                                  id="phone"
                                  className="input-transparent pl-3"
                                  value={state.phone}
                                  onChange={(event) => changeCred(event)}
                                  type="text"
                                  required
                                  name="phone"
                                  placeholder="1234567890"
                                />
                              </FormGroup>
                              <div className="bg-widget d-flex justify-content-center">
                                <Button className="rounded-pill my-3" type="submit" color="secondary-red">Submit</Button>
                              </div>
                            </form>
                          {/* </Widget> */}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default PatientsCreateComponenet;
