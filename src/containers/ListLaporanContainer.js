import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import LengkapiAbsenButton2 from "../components/LengkapiAbsenButton2";
import { getOptKantin } from "../actions/optAction";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantin());
    this.props.dispatch(getUsersList());
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#fec107" }}>
          <tr>
          <td width="22%"></td>
            <td>
              <LengkapiAbsenGuestComponent onSubmit={(data) => this.handleSubmit2(data)} />
            </td>
            <td>
              <tr>
                <td width="20">.</td>
              </tr>
              <tr>
                <LengkapiAbsenButton2 />
              </tr>
            </td>
            <td width="20%"></td>
          </tr>
        </div>
        </div>
    );
  }
}

export default connect()(ListLaporanContainer);
