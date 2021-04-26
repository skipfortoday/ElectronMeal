import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanRperhari: state.Laporan.getLaporanRperhari,
    errorLaporanRperhari: state.Laporan.errorLaporanRperhari,
  };
};

const RekapLaporan = (props) => {
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '14px' , fontWeight: "bold" , lineHeight : "70%" , fontFamily : "Arial"}}>
         <tr >
          <td width="120"></td>
          <td width="10"></td>
          <td width="300"></td>
          <td style={{fontSize: '18px' , fontWeight: "bold" , lineHeight : "70%" , fontFamily : "Arial", textDecoration:"underline"}}>DAILY MEAL COUNT SHEET</td>
        </tr>
        <tr >
          <td width="120">Location</td>
          <td width="10">:</td>
          <td>{props.getLaporanRperhari.NamaKantin}</td>
        </tr>
        <tr>
          <td width="120">Departemen</td>
          <td width="10">:</td>
          <td>{props.getLaporanRperhari.NamaDepartemen}</td>
        </tr> 
        <tr>
          <td width="120">Cost Center </td>
          <td width="10">:</td>
          <td>.........................</td>
          <td width="300"></td>
          <td width="10">Date </td>
          <td width="10">:</td>
          <td>{props.getLaporanRperhari.Tanggal}</td>
        </tr>
        
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLaporan);
