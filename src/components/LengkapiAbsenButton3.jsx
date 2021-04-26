import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";


const LengkapiAbsenButton3 = ({ values }) => {
  return (
    <Row className="mb-2">
      <Col>
          <a href={"/laporandetailperhari/"+values.Kantin.value+"/"+values.Tanggal+"/"+values.Departemen.value}>
          <Button color="dark" >
         
            <FontAwesomeIcon icon={faDesktop} /> Print View
          </Button>
          </a>
      </Col>
    </Row>
  );
};

export default connect(state => ({
    values: getFormValues("formLaporanPerhari")(state)
  }))(LengkapiAbsenButton3);