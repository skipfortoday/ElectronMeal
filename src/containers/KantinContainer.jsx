import React, { Component } from "react";
import KantinComponent from "../components/KantinComponent.jsx";
import { connect } from "react-redux";
import { getKantinList, deleteDataKantin, postKantinCreate, putKantinUpdate, getKantinDetail } from "../actions/KantinAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import FormKantinComponent from "../components/FormKantinComponent.jsx";
import { Container, Col, Row , Label} from "reactstrap";
import {reset} from 'redux-form';
import BackKantin from "../components/BackKantin.jsx";

const mapStateToProps = (state) => {
  return {
    getResponDataKantin: state.Kantin.getResponDataKantin,
    errorResponDataKantin: state.Kantin.errorResponDataKantin,
  };
};

class KantinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getKantinDetail(this.props.match.params.SNMesin));
    this.props.dispatch(getKantinList());
    this.props.dispatch(deleteDataKantin());
  }

  componentDidUpdate() {
    this.props.dispatch(getKantinDetail(this.props.match.params.SNMesin));
    this.props.dispatch(getKantinList());
    this.props.dispatch(deleteDataKantin());
  }

  handleSubmit(data) {
    if(this.props.match.params.SNMesin){
      this.props.dispatch(
        putKantinUpdate(data, this.props.match.params.SNMesin)
      );
    } else {
      this.props.dispatch(postKantinCreate(data));
    }
    
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
      } else if (this.props.getResponDataKantin.sqlMessage){ 
        swal(
          "Failed!",
          "" +
          this.props.getResponDataKantin.sqlMessage +
            "  ",
            "error" 
        ); this.props.dispatch(deleteDataKantin());
      } 
      else if (this.props.match.params.SNMesin){ 
        swal(
          "Kantin Updated!",
          "  ",
          "success" 
        ); this.props.dispatch(deleteDataKantin());
      } else {
        swal(
          "Kantin Created!",
           "  ",
          "success" 
        ); this.props.dispatch(deleteDataKantin());
            
      }
      this.props.dispatch(reset('formCreateKantin')); 
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <Container>
            <Row>
              <Col md={10}>
              <FormKantinComponent onSubmit={(data) => this.handleSubmit(data)} dis={this.props.match.params.SNMesin ? (true): (false)} />
              </Col>
              <Col md={2}>
                <Label>.</Label>
                {this.props.match.params.SNMesin ? 
              ( <BackKantin /> ) : ("")}
              </Col>
              </Row>
          </Container>
        </div>
        <KantinComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(KantinContainer);
