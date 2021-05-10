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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const mapStateToProps = (state) => {
  return {
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
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

  componentDidUpdate(){
    if (this.props.getLaporanPerhari) {
      if(!this.props.getLaporanPerhari[0]){
      swal("Failed!", "Tidak Ada Data", "error");
        } else if(!this.props.getLaporanPerhari2[0].Nama ) {
          swal("Failed!", "Ada Pegawai Yang Berlum Terdaftar, Dengan PIN: " + this.props.getLaporanPerhari[0].PIN,  "error").then(() => {
            this.props.dispatch(isInitial(),
            this.props.dispatch(resetLaporan())
            )
        })  ;
        }
    } 
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
        <ReactHTMLTableToExcel
                    id="test-table-xls"
                    className="download-table-xls-button"
                    table="laporanharian"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
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
       ""
        )}
        </div>):("")}
    </div>
    );
  }
}

export default connect(mapStateToProps,null)(ListLaporanContainer);
