import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";

// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import MUIDataTable from "mui-datatables";

import cloudIcon from "../../../common/assets/tables/cloudIcon.svg";
import funnelIcon from "../../../common/assets/tables/funnelIcon.svg";
import optionsIcon from "../../../common/assets/tables/optionsIcon.svg";
import printerIcon from "../../../common/assets/tables/printerIcon.svg";
import searchIcon from "../../../common/assets/tables/searchIcon.svg";

import s from "./PatientsList.module.scss";
import mock from "./patientslist.mock.js";
import PatientService from "../../services/patientService.js";

const PatientsList = function () {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [patientsTableList,setPatientsTableList] = useState([]);
  const [secondTable] = useState(mock.secondTable);
  const [transactions, setTransactions] = useState(mock.transactionsWidget);
  const [tasks, setTasks] = useState(mock.tasksWidget);
  const [patientTableCurrentPage, setPatentTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  const pageSize = 4;
  const patientTablePagesCount = Math.ceil(patientsTableList.length / pageSize);
  const secondTablePagesCount = Math.ceil(secondTable.length / pageSize);

  const setPatientTablePage = (e, index) => {
    e.preventDefault();
    setPatentTableCurrentPage(index);
  }


  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const transactionMenuOpen = (id) => {
    setTransactions(
      transactions.map( transaction => {
        if (transaction.id === id) {
          transaction.dropdownOpen = !transaction.dropdownOpen;
        }
        return transaction;
      })
    )
  }

  const tableMenuOpen = () => {
    setTableMenuOpen(!tableDropdownOpen);
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map( task => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    )
  }

  const fetchPatientListData = ()=>{
    new PatientService().fetchPatients().then(response=>{
      console.log(response.data.data);
      setPatientsTableList(response.data.data);
    });
  }

  useEffect(() => {
    fetchPatientListData();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Patients List</div>
                  <div className="d-flex">
                    {/* <a href="/#"><img src={searchIcon} alt="Search"/></a>
                    <a href="/#"><img className="d-none d-sm-block" src={cloudIcon} alt="Cloud" /></a>
                    <a href="/#"><img src={printerIcon} alt="Printer" /></a>
                    <a href="/#"><img className="d-none d-sm-block" src={optionsIcon} alt="Options" /></a>
                    <a href="/#"><img src={funnelIcon} alt="Funnel" /></a> */}
                  </div>
                </div>
                <div className="widget-table-overflow">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead>
                    <tr>
                      <th className={s.checkboxCol}>
                        <div className="checkbox checkbox-primary">
                          <input
                            className="styled"
                            id="checkbox100"
                            type="checkbox"
                          />
                          <label for="checkbox100"/>
                        </div>
                      </th>
                      <th className="w-25">Patient NAME</th>
                      <th className="w-25">Patient UUID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patientsTableList
                      .slice(
                        patientTableCurrentPage * pageSize,
                        (patientTableCurrentPage + 1) * pageSize
                      )
                      .map(item => (
                        <tr key={uuidv4()}>
                          <td>
                            <div className="checkbox checkbox-primary">
                              <input
                                id={item.id}
                                className="styled"
                                type="checkbox"
                              />
                              <Label for={item.id} />
                            </div>
                          </td>
                          <td className="d-flex align-items-center">
                            {/* <img className={s.image} src={item.img} alt="User"/> */}
                            <span className="ml-3">{item.first_name}</span></td>
                          <td>{item.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-borderless" aria-label="Page navigation example">
                    <PaginationItem disabled={patientTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setPatientTablePage(e, patientTableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(patientTablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === patientTableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setPatientTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={patientTableCurrentPage >= patientTablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setPatientTablePage(e, patientTableCurrentPage + 1)}
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default PatientsList;
