import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import { getUserDetail, putUserUpdate } from "../actions/userAction";
import { getOptDepartemen,  getOptKantor } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantor());
    this.props.dispatch(getOptDepartemen());
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(putUserUpdate(data, this.props.match.params.UserID));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Harus Login", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Failed!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "User " + this.props.getResponDataUser.Nama + " Updated!",
          " NIP : " + this.props.getResponDataUser.NIP,
          "success" 
        );window.location.reload();
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#fec107" }}>
          <BackComponent />
          <Container>
            <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditUserContainer);
