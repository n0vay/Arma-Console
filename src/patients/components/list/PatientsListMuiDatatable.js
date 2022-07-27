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
  Spinner,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";

import MUIDataTable from "mui-datatables";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import MUIDataTable from "mui-datatables";

import cloudIcon from "../../../common/assets/tables/cloudIcon.svg";
import funnelIcon from "../../../common/assets/tables/funnelIcon.svg";
import optionsIcon from "../../../common/assets/tables/optionsIcon.svg";
import printerIcon from "../../../common/assets/tables/printerIcon.svg";
import searchIcon from "../../../common/assets/tables/searchIcon.svg";

import s from "./PatientsList.module.scss";

import PatientService from "../../services/patientService.js";
import { toast } from "react-toastify";

const PatientsListMuiDatatable = function () {

  
  const [patientsTableList,setPatientsTableList] = useState([]);

  const [isLoading,setIsLoading] = useState(false);
  const [patientTableCurrentPage, setPatentTableCurrentPage] = useState(0);

  const pageSize = 4;
  const patientTablePagesCount = Math.ceil(patientsTableList.length / pageSize);
  

  const setPatientTablePage = (e, index) => {
    e.preventDefault();
    setPatentTableCurrentPage(index);
  }



  const fetchPatientListData = ()=>{
    setIsLoading(true)
    new PatientService().fetchPatients().then(response=>{
      setIsLoading(false)
      console.log(response.data.data);
      setPatientsTableList(response.data.data);
    }).catch(err=>{
      setIsLoading(false)
      toast.error(err.message,{
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

  useEffect(() => {
    fetchPatientListData();
  }, []);

  const columns = [
    {
     name: "id",
     label: "Patient UUID",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "first_name",
     label: "First Name",
     options: {
      filter: true,
      sort: false,
     }
    },
   ];
   const options = {
    filterType: 'checkbox',
  };
  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              {/* <Widget> */}
                <div className={s.tableTitle}>
                  {/* <div className="headline-2">Patients List</div> */}
                  <div className="d-flex">
                    {/* <a href="/#"><img src={searchIcon} alt="Search"/></a>
                    <a href="/#"><img className="d-none d-sm-block" src={cloudIcon} alt="Cloud" /></a>
                    <a href="/#"><img src={printerIcon} alt="Printer" /></a>
                    <a href="/#"><img className="d-none d-sm-block" src={optionsIcon} alt="Options" /></a>
                    <a href="/#"><img src={funnelIcon} alt="Funnel" /></a> */}
                  </div>
                </div>
                {isLoading && 
                  (
                    <Spinner>
                      Loading...
                    </Spinner>
                  )
                }
                
                <div className="widget-table-overflow">
                  <MUIDataTable
                    title={"Patient List"}
                    data={patientsTableList}
                    columns={columns}
                    options={options}
                  />
                </div>
              {/* </Widget> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default PatientsListMuiDatatable;
