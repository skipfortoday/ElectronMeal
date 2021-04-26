import React, { Component } from "react";
import { Container, Col, Row , Label} from "reactstrap";
import { connect } from "react-redux";
import FormDepartemenComponent from "../components/FormDepartemenComponent";
import { getDepartemenDetail, putDepartemenUpdate,getDepartemenList,deleteDataDepartemen } from "../actions/DepartemenAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import DepartemenComponent from "../components/DepartemenComponent";
import BackDepartemen from "../components/BackDepartemen.jsx";

const mapStateToProps = (state) => {
  return {
    getResponDataDepartemen: state.Departemen.getResponDataDepartemen,
    errorResponDataDepartemen: state.Departemen.errorResponDataDepartemen,
  };
};

class EditDepartemenContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getDepartemenDetail(this.props.match.params.DepartemenID));
    this.props.dispatch(getDepartemenList());
    this.props.dispatch(deleteDataDepartemen());
  }

  handleSubmit(data) {
    this.props.dispatch(
      putDepartemenUpdate(data, this.props.match.params.DepartemenID)
    );
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataDepartemen || this.props.errorResponDataDepartemen) {
      if (this.props.errorResponDataDepartemen) {
        swal("Failed!", this.props.errorResponDataDepartemen, "error");
      } else {
        swal(
          "Departemen Updated!",
            " Nama Departemen: " +
            this.props.getResponDataDepartemen.NamaDepartemen,
          "success"
        ); return <Redirect to="/Departemen" />
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <Container>
            <Row>
              <Col md={10}>
              <FormDepartemenComponent onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
              <Col md={2}>
                <Label>.</Label>
              <BackDepartemen/>
              </Col>
              </Row>
          </Container>
        </div>
        <DepartemenComponent/>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditDepartemenContainer);
