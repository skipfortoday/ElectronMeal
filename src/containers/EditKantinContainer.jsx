import React, { Component } from "react";
import { Container, Col, Row , Label} from "reactstrap";
import { connect } from "react-redux";
import FormKantinComponent from "../components/FormKantinComponent.jsx";
import { getKantinDetail, putKantinUpdate,getKantinList,deleteDataKantin } from "../actions/KantinAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import KantinComponent from "../components/KantinComponent.jsx";
import BackKantin from "../components/BackKantin.jsx";

const mapStateToProps = (state) => {
  return {
    getResponDataKantin: state.Kantin.getResponDataKantin,
    errorResponDataKantin: state.Kantin.errorResponDataKantin,
  };
};

class EditKantinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getKantinDetail(this.props.match.params.SNMesin));
    this.props.dispatch(getKantinList());
    this.props.dispatch(deleteDataKantin());
  }

  handleSubmit(data) {
    this.props.dispatch(
      putKantinUpdate(data, this.props.match.params.SNMesin)
    );
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataKantin || this.props.errorResponDataKantin) {
      if (this.props.errorResponDataKantin) {
        swal("Failed!", this.props.errorResponDataKantin, "error");
      } else {
        swal(
          "Kantin Updated!",
            " Nama Kantin: " +
            this.props.getResponDataKantin.NamaKantin,
          "success"
        ); return <Redirect to="/Kantin" />
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <Container>
            <Row>
              <Col md={10}>
              <FormKantinComponent onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
              <Col md={2}>
              <Label>.</Label>
              <BackKantin/>
              </Col>
              </Row>
          </Container>
        </div>
        <KantinComponent/>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditKantinContainer);
