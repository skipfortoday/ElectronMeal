import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getLaporanPerhari2,
  getLaporanRperhari2,
  isInitial,
  resetLaporan,
  setLoading,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import {  getOptKantin } from "../actions/optAction";
import FormLaporanPerhari2 from "../components/FormLaporanPerhari2";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import PrintButton from "../components/PrintButton";
import { Container, Row, Spinner } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan2 from "../components/RekapLaporan2";
import LaporanDetailPerhari2 from "../components/LaporanDetailPerhari2";
import RekapLeft2 from "../components/RekapLeft2";


const mapStateToProps = (state) => {
  return {
    errorLaporanDetail2: state.Laporan.errorLaporanDetail2,
    getLaporanPerhari2: state.Laporan.getLaporanPerhari2,
    getLaporanRperhari2: state.Laporan.getLaporanRperhari2,
    isLoading:state.Laporan.isLoading,
    isInitial:state.Laporan.isInitial
  };
};

class LaporanPerhari2 extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantin());
    this.props.dispatch(isInitial());
  }

  handleSubmit(data) {
     console.log(data)
    this.props.dispatch(resetLaporan());
    this.props.dispatch(
      getLaporanRperhari2(
       data.Kantin.value,
       data.Tanggal,
      )
    );
    this.props.dispatch(
      getLaporanPerhari2(
        data.Kantin.value,
       data.Tanggal,
      )
    );
  
    this.props.dispatch(setLoading(true));
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
            <FormLaporanPerhari2 onSubmit={(data) => this.handleSubmit(data)}/>
          </td>
          <td width="50"></td>
          <td>
            <tr>
              .
              <PrintButton /> 
            </tr>
          </td>
        </tr>
      </div>
      {this.props.isInitial ? ( 
      <div>
      {this.props.isLoading ? (
          <div style={{textAlign:"center", padding:"50px 0px"}}>
            <Spinner />
          </div>
        ) : ("") }
        {this.props.getLaporanPerhari2[0] ? (
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
       ) : (
        <div style={{textAlign:"center", padding:"30px 0px"}}>
         <h4>Data Kosong</h4> 
      </div>
      )}
       </div>):("")}
    </div>
    );
  }
}

export default connect(mapStateToProps,null)(LaporanPerhari2);
