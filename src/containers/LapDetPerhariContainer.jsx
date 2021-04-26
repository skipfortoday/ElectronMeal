import React, { Component } from "react";
import LaporanDetailPerhari from "../components/LaporanDetailPerhari";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  getLaporanPerhari,
  getLaporanRperhari,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import PrintButton from "../components/PrintButton";
import RekapLeft3 from "../components/RekapLeft3";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import LengkapiAbsenButton3 from "../components/LengkapiAbsenButton3";
import { getOptDepartemen, getOptKantin } from "../actions/optAction";
import RekapLaporan from "../components/RekapLaporan";
import FormLaporanPerhari from "../components/FormLaporanPerhari";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


const mapStateToProps = (state) => {
  return {
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
    getLaporanPerhari :  state.Laporan.getLaporanPerhari,
  };
};

class LapDetPerhariContainer extends Component {
  componentDidMount() {
    this.props.dispatch(
      getLaporanRperhari(
        this.props.match.params.UserID,
        this.props.match.params.Tanggal,
        this.props.match.params.Kantor
      )
    );
    this.props.dispatch(
      getLaporanPerhari(
        this.props.match.params.UserID,
        this.props.match.params.Tanggal,
        this.props.match.params.Kantor
      )
    );

    this.props.dispatch(getOptKantin());
    this.props.dispatch(getOptDepartemen());
  }

  render() {
    let test = this.props.getLaporanPerhari.length
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 

    if ( this.props.match.params.UserID ==="undefined" || this.props.match.params.Tanggal ==="undefined" || this.props.match.params.Kantor ==="undefined") {
      swal("Failed!", "Lengkapi Parameter Laporan", "error");
      return <Redirect to="/laporanperhari" /> ;
    } 

    setTimeout(function () {
      if ( test === 0 ) {
        swal("Failed!", "Timeout / Data Kosong", "error");
        // return <Redirect to="/laporanperhari2" /> ;
      } 
    }, 5000);
    return (
        
     <div>
        <NavbarComponent />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <tr>
            <td width="400"></td>
            <td>
              <FormLaporanPerhari/>
            </td>
            <td width="50"></td>
            <td>
              <tr>
                <td>.
                <LengkapiAbsenButton3/>
                {/* <Reload/> */}
                </td>.
                <PrintButton /> 
                
              </tr>
            </td>
          </tr>
        </div>
          
        <Container>
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporan />
        </Row>
        <Row>
          <LaporanDetailPerhari />
          <RekapLeft3 />
        </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps,null)(LapDetPerhariContainer);
