import React, { Component } from "react";
import { Container, Col, Row , Label} from "reactstrap";
import BackCabang from "../components/BackCabang";
import { connect } from "react-redux";
import FormCabangComponent from "../components/FormCabangComponent";
import { getCabangDetail, putCabangUpdate,getCabangList,deleteDataCabang } from "../actions/cabangAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import CabangComponent from "../components/CabangComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
  };
};

class EditCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
    this.props.dispatch(getCabangList());
    this.props.dispatch(deleteDataCabang());
  }

  handleSubmit(data) {
    this.props.dispatch(
      putCabangUpdate(data, this.props.match.params.KodeCabang)
    );
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
      } else {
        swal(
          "Kantor Updated!",
            " Nama Kantor: " +
            this.props.getResponDataCabang.NamaKantor,
          "success"
        ); return <Redirect to="/cabang" />
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <Container>
            <Row>
              <Col md={10}>
              <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
              <Col md={2}>
                <Label>.</Label>
              <BackCabang />
              </Col>
              </Row>
          </Container>
        </div>
        <CabangComponent/>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditCabangContainer);
