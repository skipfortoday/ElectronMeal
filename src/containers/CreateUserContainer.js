import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import { connect } from "react-redux";
import { postUserCreate } from "../actions/userAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { getOptKantor, getOptDepartemen } from "../actions/optAction";
import { Redirect } from "react-router-dom";
import { reset } from "redux-form";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class CreateUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptDepartemen());
    this.props.dispatch(getOptKantor());
  }

  handleSubmit(data) {
    this.props.dispatch(postUserCreate(data));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login === "false") {
      swal("Failed!", "Harus Login", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Failed!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "User " + this.props.getResponDataUser.Nama + " Created!",
          " NIP : " + this.props.getResponDataUser.NIP,
          "success"
        );this.props.dispatch(reset('formCreateUser'))
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
        <BackComponent />
        <Container>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateUserContainer);
