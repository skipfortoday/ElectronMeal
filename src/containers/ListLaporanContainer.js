import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import { getOptKantin } from "../actions/optAction";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import PrintButton from "../components/PrintButton";
import { Container, Row } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporanPertanggal from "../components/RekapLaporanPertanggal";
import RekapLeft from "../components/RekapLeft";
import LaporanDetail from "../components/LaporanDetail";
import { getLaporanDetail, getLaporanRekap } from "../actions/laporanAction";


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptKantin());
    this.props.dispatch(getUsersList());
  }

  handleSubmit(data) {
    console.log(data)
    // this.props.dispatch(delet());
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
    // this.props.dispatch(setLoading(true));
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

export default connect()(ListLaporanContainer);
