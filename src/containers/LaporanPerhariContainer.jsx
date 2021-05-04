import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComponent from "../components/NavbarComponent";
import {  getOptDepartemen, getOptKantin } from "../actions/optAction";
import FormLaporanPerhari from "../components/FormLaporanPerhari";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import { getLaporanPerhari, getLaporanRperhari, isInitial, resetLaporan, setLoading } from "../actions/laporanAction";
import PrintButton from "../components/PrintButton";
import { Container, Row, Spinner } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetailPerhari from "../components/LaporanDetailPerhari";
import RekapLeft3 from "../components/RekapLeft3";

const mapStateToProps = (state) => {
  return {
    errorLaporanDetail2: state.Laporan.errorLaporanDetail2,
    getLaporanPerhari: state.Laporan.getLaporanPerhari,
    getLaporanRperhari: state.Laporan.getLaporanRperhari,
    isLoading:state.Laporan.isLoading,
    isInitial:state.Laporan.isInitial
  };
};

class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantin());
    this.props.dispatch(getOptDepartemen());
    this.props.dispatch(isInitial());
  }

  handleSubmit(data) {
    console.log(data)
    this.props.dispatch(resetLaporan());
    this.props.dispatch(
      getLaporanRperhari(
       data.Kantin.value,
       data.Tanggal,
       data.Departemen.value
      )
    );
    this.props.dispatch(
      getLaporanPerhari(
        data.Kantin.value,
       data.Tanggal,
       data.Departemen.value
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
            <FormLaporanPerhari onSubmit={(data) => this.handleSubmit(data)}/>
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
        {this.props.getLaporanPerhari[0] ? (
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

export default connect(mapStateToProps,null)(ListLaporanContainer);
