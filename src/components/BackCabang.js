import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackCabang = () => {
  return (
    <Row className="mb-2">
      <Col>
        <Link to="/cabang">
          <Button color="dark">
            <FontAwesomeIcon icon={faArrowLeft} /> Clear
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default BackCabang;
