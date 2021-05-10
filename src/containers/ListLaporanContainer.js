import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import { getOptKantin } from "../actions/optAction";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import PrintButton from "../components/PrintButton";
import { Container, Row, Spinner } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporanPertanggal from "../components/RekapLaporanPertanggal";
import RekapLeft from "../components/RekapLeft";
import LaporanDetail from "../components/LaporanDetail";
import { getCekData, getLaporanDetail, getLaporanRekap, isInitial, resetLaporan, setLoading } from "../actions/laporanAction";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getLaporanRekap: state.Laporan.getLaporanRekap,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
    isLoading:state.Laporan.isLoading,
    isInitial:state.Laporan.isInitial,
    getCekData:state.Laporan.getCekData
  };
};


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantin());
    this.props.dispatch(getUsersList());
    this.props.dispatch(isInitial());
  }

  componentDidUpdate(){
    if (this.props.getCekData[0]) {
        swal("Failed!", " Laporan di tanggal yang dipilih Tidak Sesuai, Tambah Pegawai Dengan PIN: " + this.props.getCekData[0].PIN , "error").then(() => {
          this.props.dispatch(isInitial(),this.props.dispatch(resetLaporan()))
      })
    }
  }

  handleSubmit(data) {
    // console.log(data)
    this.props.dispatch(resetLaporan());
    this.props.dispatch(
      getLaporanDetail(
        data.Kantin.value,
        data.TglAwal,
        data.TglAkhir
      )
    );
    this.props.dispatch(
      getLaporanRekap(
        data.Kantin.value,
        data.TglAwal,
        data.TglAkhir
      )
    );
    this.props.dispatch(
      getCekData(
        data.Kantin.value,
        data.TglAwal,
        data.TglAkhir
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
            <td width="20%"></td>
            <td>
              <LengkapiAbsenGuestComponent onSubmit={(data) => this.handleSubmit(data)} />
            </td>
            <td>
              <tr>.
                <PrintButton />
              </tr>
            </td>
            <td width="20%"></td>
          </tr>
        </div>
        {this.props.isInitial ? ( 
      <div>
        {this.props.isLoading ? (
          <div style={{textAlign:"center", padding:"50px 0px"}}>
            <Spinner />
          </div>
        ) : ("") }
         {this.props.getLaporanRekap ? (
        <Container>
        <ReactHTMLTableToExcel
                    id="test-table-xls"
                    className="download-table-xls-button"
                    table="laporantgl"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporanPertanggal />
        </Row>
        <Row>
          <LaporanDetail />
          <RekapLeft />
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

export default connect(mapStateToProps, null)(ListLaporanContainer);
