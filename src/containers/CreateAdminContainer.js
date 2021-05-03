import React, { Component } from "react";
import { Container } from "reactstrap";
import FormAdminComponent from "../components/FormAdminComponent";
import { connect } from "react-redux";
import { postAdminCreate } from "../actions/adminAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import BackAdminComponent from "../components/BackAdminComponent";
import { reset } from "redux-form";


const mapStateToProps = (state) => {
  return {
    getResponDataAdmin: state.Admin.getResponDataAdmin,
    errorResponDataAdmin: state.Admin.errorResponDataAdmin,
  };
};


class CreateAdminContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postAdminCreate(data));
  }

  
  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
      if (this.props.errorResponDataAdmin) {
        swal("Failed!", this.props.errorResponDataAdmin, "error");
      } else {
        swal(
          "Admin Created!",
          "ID : " +
            this.props.getResponDataAdmin.AdminID +
            " , Tgl : " +
            this.props.getResponDataAdmin.TanggalCreate,
          "success"
        );this.props.dispatch(reset('formCreateAdmin'))
      }
    }
    return (
     <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
        <BackAdminComponent />
        <Container>
        <FormAdminComponent onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateAdminContainer);
