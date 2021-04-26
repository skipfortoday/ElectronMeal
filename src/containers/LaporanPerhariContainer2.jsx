import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getLaporanPerhari2,
  getLaporanRperhari2,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton4 from "../components/LengkapiAbsenButton4";
import {  getOptKantin } from "../actions/optAction";
import FormLaporanPerhari2 from "../components/FormLaporanPerhari2";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


const mapStateToProps = (state) => {
  return {
    errorLaporanDetail2: state.Laporan.errorLaporanDetail2,
  };
};

class LaporanPerhari2 extends Component {
  componentDidMount() {
    this.props.dispatch(
      getLaporanPerhari2(
        this.props.match.params.UserID,
        this.props.match.params.Tanggal,
      )
    );
    this.props.dispatch(
      getLaporanRperhari2(
        this.props.match.params.UserID,
        this.props.match.params.Tanggal,
      )
    );
    // this.props.dispatch(getLaporanHead(this.props.match.params.UserID));
    this.props.dispatch(getOptKantin());
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
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <tr>
            <td width="400"></td>
            <td>
              <FormLaporanPerhari2/>
            </td>
            <td width="50"></td>
            <td>
              <tr>
                <td>
                  .
                <LengkapiAbsenButton4/>
                {/* <Reload/> */}
                </td>
                {/* .
                <PrintButton />  */}
                
              </tr>
            </td>
          </tr>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,null)(LaporanPerhari2);
