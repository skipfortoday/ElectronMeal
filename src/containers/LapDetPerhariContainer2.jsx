import React, { Component } from "react";
import LaporanDetailPerhari2 from "../components/LaporanDetailPerhari2.jsx";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  getLaporanPerhari2,
  getLaporanRperhari2,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import PrintButton from "../components/PrintButton";
import RekapLeft2 from "../components/RekapLeft2";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import LengkapiAbsenButton4 from "../components/LengkapiAbsenButton4";
import {  getOptKantin } from "../actions/optAction";
import RekapLaporan2 from "../components/RekapLaporan2";
import FormLaporanPerhari2 from "../components/FormLaporanPerhari2";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
 

const mapStateToProps = (state) => {
  return {
    errorLaporanDetail2: state.Laporan.errorLaporanDetail2,
    getLaporanPerhari2: state.Laporan.getLaporanPerhari2,
  };
};

class LapDetPerhariContainer2 extends Component {
  componentDidMount() {
    this.props.dispatch(
      getLaporanRperhari2(
        this.props.match.params.UserID,
        this.props.match.params.Tanggal,
      )
    );
    this.props.dispatch(
      getLaporanPerhari2(
        this.props.match.params.UserID,
        this.props.match.params.Tanggal,
      )
    );
  
    // this.props.dispatch(getLaporanHead(this.props.match.params.UserID));
    this.props.dispatch(getOptKantin());
  }

  render() {
    let test = this.props.getLaporanPerhari2.length
    console.log(test)
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if ( this.props.match.params.UserID ==="undefined" || this.props.match.params.Tanggal ==="undefined" || this.props.match.params.Tanggal ==="0000-00-00") {
      swal("Failed!", "Lengkapi Parameter Laporan", "error");
      return <Redirect to="/laporanperhari2" /> ;
    } 

    
    setTimeout(function () {
      if ( test === 0 ) {
        swal("Failed!", "Timeout / Data Kosong", "error");
        // return <Redirect to="/laporanperhari2" /> ;
      } 
    }, 5000);

    // if ( this.props.getLaporanPerhari2.length === 0 ) {
    //   swal("Failed!", "kosong", "error");
    // } 
    

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
                .
                <PrintButton /> 
                
              </tr>
            </td>
          </tr>
        </div>
          
        <Container>
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporan2 />
        </Row>
        <Row>
          <LaporanDetailPerhari2 />
          <RekapLeft2 />
        </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps,null)(LapDetPerhariContainer2);
