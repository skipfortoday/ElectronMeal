import React, { Component } from "react";
import DepartemenComponent from "../components/DepartemenComponent";
import { connect } from "react-redux";
import { getDepartemenList, deleteDataDepartemen, postDepartemenCreate, getDepartemenDetail, putDepartemenUpdate } from "../actions/DepartemenAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import FormDepartemenComponent from "../components/FormDepartemenComponent";
import { Container, Col, Row , Label} from "reactstrap";
import { reset } from "redux-form";
import BackDepartemen from "../components/BackDepartemen";

const mapStateToProps = (state) => {
  return {
    getResponDataDepartemen: state.Departemen.getResponDataDepartemen,
    errorResponDataDepartemen: state.Departemen.errorResponDataDepartemen,
  };
};


class DepartemenContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getDepartemenDetail(this.props.match.params.DepartemenID));
    this.props.dispatch(getDepartemenList());
    this.props.dispatch(deleteDataDepartemen());
  }
  
  componentDidUpdate() {
    this.props.dispatch(getDepartemenDetail(this.props.match.params.DepartemenID));
    this.props.dispatch(getDepartemenList());
    this.props.dispatch(deleteDataDepartemen());
  }

  handleSubmit(data) {
    if(this.props.match.params.DepartemenID){
      this.props.dispatch(
        putDepartemenUpdate(data, this.props.match.params.DepartemenID)
      );
    }else{
      this.props.dispatch(postDepartemenCreate(data));
    }
    
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
      } else if (this.props.match.params.DepartemenID) { 
        swal(
          "Departemen Updated!",
          "Nama Departemen: " +
            this.props.getResponDataDepartemen.NamaDepartemen +
            "  ",
          "success" 
        ); this.props.dispatch(deleteDataDepartemen());
      } else {
        swal(
          "Departemen Created!",
          "Nama Departemen: " +
            this.props.getResponDataDepartemen.NamaDepartemen +
            "  ",
          "success" 
        ); this.props.dispatch(deleteDataDepartemen());
        this.props.dispatch(reset('formCreateDepartemen'));
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
                {this.props.match.params.DepartemenID ? (<BackDepartemen/>) : ""}
                
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
