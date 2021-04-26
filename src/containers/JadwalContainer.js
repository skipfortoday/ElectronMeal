import React, { Component } from "react";
import JadwalComponent from "../components/JadwalComponent.jsx";
import { connect } from "react-redux";
import { getJadwalDetail, putJadwalUpdate} from "../actions/JadwalAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import { Container, Col, Row , Label} from "reactstrap";
const mapStateToProps = (state) => {
  return {
    getResponDataJadwal: state.Jadwal.getResponDataJadwal,
    errorResponDataJadwal: state.Jadwal.errorResponDataJadwal,
  };
};


class JadwalContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getJadwalDetail(this.props.match.params.ID));
  }


  handleSubmit(data) {
    this.props.dispatch(
      putJadwalUpdate(data, this.props.match.params.ID)
    );
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 

    if (this.props.getResponDataJadwal || this.props.errorResponDataJadwal) {
      if (this.props.errorResponDataJadwal) {
        swal("Failed!", this.props.errorResponDataJadwal, "error");
      } else { 
        swal(
          "Jadwal Updated!",
          "OK" ,
          "success" 
        ); 
        window.location.reload()
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <Container>
            <Row>
              <Col md={10}>
              <JadwalComponent onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
              <Col md={2}>
                <Label>.</Label>
              {/* */}
              </Col>
              </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(JadwalContainer);
