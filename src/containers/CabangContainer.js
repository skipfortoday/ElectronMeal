import React, { Component } from "react";
import CabangComponent from "../components/CabangComponent";
import { connect } from "react-redux";
import { getCabangList, deleteDataCabang, postCabangCreate, getCabangDetail, putCabangUpdate } from "../actions/cabangAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import FormCabangComponent from "../components/FormCabangComponent";
import { Container, Col, Row , Label} from "reactstrap";
import { reset } from "redux-form";
import BackCabang from "../components/BackCabang";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
  };
};


class CabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
    this.props.dispatch(getCabangList());
    this.props.dispatch(deleteDataCabang());
  }

  componentDidUpdate() {
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
    this.props.dispatch(getCabangList());
    this.props.dispatch(deleteDataCabang());
  }

  handleSubmit(data) {
    if(this.props.match.params.KodeCabang){
      this.props.dispatch(
        putCabangUpdate(data, this.props.match.params.KodeCabang)
      );
    }else {
      this.props.dispatch(postCabangCreate(data));
    }
 
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 

    if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
      if (this.props.errorResponDataCabang) {
        swal("Failed!", this.props.errorResponDataCabang, "error");
      } else if(this.props.match.params.KodeCabang){ 
        swal(
          "Kantor Updated!",
          "Nama Kantor: " +
            this.props.getResponDataCabang.NamaKantor +
            "  ",
          "success" 
        );this.props.dispatch(deleteDataCabang());
      } else {
        swal(
          "Kantor Created!",
          "Nama Kantor: " +
            this.props.getResponDataCabang.NamaKantor +
            "  ",
          "success" 
        );this.props.dispatch(deleteDataCabang());
          this.props.dispatch(reset('formCreateCabang'));
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
        <Container>
            <Row>
              <Col md={10}>
              <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)}  />
              </Col>
              <Col md={2}>
                <Label>.</Label>
                {this.props.match.params.KodeCabang ? 
              ( <BackCabang /> ) : ("")}
              </Col>
              </Row>
          </Container>
        </div>
        <CabangComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CabangContainer);
