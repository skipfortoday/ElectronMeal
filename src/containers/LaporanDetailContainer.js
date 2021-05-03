import React, { Component } from "react";
import ReactExport from "react-data-export";
import LaporanDetail from "../components/LaporanDetail";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  getLaporanDetail,
  getLaporanRekap,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";

import PrintButton from "../components/PrintButton";
import RekapLeft from "../components/RekapLeft";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import LengkapiAbsenButton2 from "../components/LengkapiAbsenButton2";
import { getOptKantin } from "../actions/optAction";
import RekapLaporanPertanggal from "../components/RekapLaporanPertanggal";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
// import {ExcelFile, ExcelSheet} from "react-data-export";
// import {ExcelFile, ExcelSheet} from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const multiDataSet = [
  {
      columns: ["Name", "Salary", "Sex"],
      data: [
          ["Johnson", 30000, "Male"],
          ["Monika", 355000, "Female"],
          ["Konstantina", 20000, "Female"],
          ["John", 250000, "Male"],
          ["Josef", 450500, "Male"],
      ]
  },
  {
      xSteps: 1, // Will start putting cell with 1 empty cell on left most
      ySteps: 5, //will put space of 5 rows,
      columns: ["Name", "Department"],
      data: [
          ["Johnson", "Finance"],
          ["Monika", "IT"],
          ["Konstantina", "IT Billing"],
          ["John", "HR"],
          ["Josef", "Testing"],
      ]
  }
];

const mapStateToProps = (state) => {
  return {
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
  };
};

class LaporanDetailContainer extends Component {
  componentDidMount() {
    this.props.dispatch(
      getLaporanDetail(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(
      getLaporanRekap(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
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
    if ( this.props.match.params.UserID ==="undefined" || this.props.match.params.TglAwal ==="undefined" || this.props.match.params.TglAkhir ==="undefined") {
      swal("Failed!", "Lengkapi Parameter Laporan", "error");
      return <Redirect to="/laporan" /> ;
    } 
    return (
        
     <div>
        <NavbarComponent />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <tr>
            <td width="20%"></td>
            <td>
              <LengkapiAbsenGuestComponent onSubmit={(data) => this.handleSubmit2(data)} />
            </td>
            <td>
              <tr>
                <td>.
                <LengkapiAbsenButton2 />
                {/* <Reload/> */}
                </td>.
                <PrintButton />
                <ExcelFile>
                <ExcelSheet dataSet={multiDataSet} name="Organization"/>
            </ExcelFile>

                
              </tr>
            </td>
            <td width="20%"></td>
          </tr>
        </div>
          
        <Container>
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporanPertanggal />
        </Row>
        <Row>
          <LaporanDetail />
          <RekapLeft />
        </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps,null)(LaporanDetailContainer);
