import React, { Component } from "react";
import DepartemenComponent from "../components/DepartemenComponent";
import { connect } from "react-redux";
import { getDepartemenList, deleteDataDepartemen, postDepartemenCreate } from "../actions/DepartemenAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import FormDepartemenComponent from "../components/FormDepartemenComponent";
import { Container, Col, Row , Label} from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getResponDataDepartemen: state.Departemen.getResponDataDepartemen,
    errorResponDataDepartemen: state.Departemen.errorResponDataDepartemen,
  };
};


class DepartemenContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getDepartemenList());
    this.props.dispatch(deleteDataDepartemen());
  }

  handleSubmit(data) {
    this.props.dispatch(postDepartemenCreate(data));
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
          "Departemen Created!",
          "Nama Departemen: " +
            this.props.getResponDataDepartemen.NamaDepartemen +
            "  ",
          "success" 
        ); window.location.reload()
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
              {/* */}
              </Col>
              </Row>
          </Container>
        </div>
        <DepartemenComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(DepartemenContainer);
