import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faRetweet} from "@fortawesome/free-solid-svg-icons";

const Reload = () => {
  return (
    <Row className="mb-2">
      <Col>
          <Button color="dark" onClick={() => window.location.reload()}>
            <FontAwesomeIcon icon={faRetweet} /> Proses Kalkulasi
          </Button>
      </Col>
    </Row>
  );
};

export default Reload;
