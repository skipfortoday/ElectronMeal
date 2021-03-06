import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import TableComponent from "../components/TableComponent";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";

import NavbarComponent from "../components/NavbarComponent";


const mapStateToProps = (state) => {
  return {
    getResponLoginUser : state.Login.getResponLoginUser,
  };
};


class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login === "false" || ambil === undefined)  {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    return (
      <div>
        <NavbarComponent />
        <TableComponent />

        </div>
    );
  }
}

export default connect(mapStateToProps, null)(HomeContainer);
