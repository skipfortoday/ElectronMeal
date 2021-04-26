import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton3 from "../components/LengkapiAbsenButton3";
import {  getOptDepartemen, getOptKantin } from "../actions/optAction";
import FormLaporanPerhari from "../components/FormLaporanPerhari";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantin());
    this.props.dispatch(getOptDepartemen());
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
          <td width="400"></td>
            <td>
              <FormLaporanPerhari onSubmit={(data) => this.handleSubmit2(data)} />
            </td>
            <td width="50"></td>
            <td>
              <tr>
                <td width="20">.</td>
              </tr>
              <tr>
                <LengkapiAbsenButton3 />
                
              </tr>
            </td>
          </tr>
        </div>
        </div>
    );
  }
}

export default connect()(ListLaporanContainer);
