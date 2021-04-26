import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getUserDetail: state.users.getUserDetail,
    getLaporanRekap: state.Laporan.getLaporanRekap,
    errorUserDetail: state.users.errorUserDetail,
  };
};

const RekapLaporan = (props) => {
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '16px' , fontWeight: "bold" , lineHeight : "100%" , fontFamily : "Arial"}}>
         <tr >
          <td width="120"></td>
          <td width="10"></td>
          <td width="300"></td>
          <td style={{fontSize: '18px' , fontWeight: "bold" , lineHeight : "70%" , fontFamily : "Arial", textDecoration:"underline"}}>MEAL CHARGES PERIODE</td>
        </tr>
        <tr >
          <td width="120">Location</td>
          <td width="10">:</td>
          <td>{props.getLaporanRekap.NamaKantin}</td>
        </tr>
        <tr>
          <td width="120">Periode </td>
          <td width="10">:</td>
          <td>{props.getLaporanRekap.TglAwal} ~ {props.getLaporanRekap.TglAkhir}</td>
          <td width="600"></td>
    
        </tr>
        
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLaporan);
