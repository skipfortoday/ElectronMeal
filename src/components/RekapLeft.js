import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanRekap: state.Laporan.getLaporanRekap,
    errorLaporanRekap: state.Laporan.errorLaporanRekap,
  };
};

  
const RekapLeft = (props) => {
  let ambil = JSON.parse(localStorage.getItem('user'));
  return (
    <Table>
      <tbody style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "Arial"}}>
        <tr style={{ lineHeight : '9px' }} >
        <td style={{ width : '600px' }}>TOTAL</td>
          <td style={{ width : '150px' }}>Lunch</td>
          <td >:</td>
          <td>{props.getLaporanRekap.TotalLunch}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td style={{ width : '170px' }}>Supper</td>
          <td >:</td>
          <td >{props.getLaporanRekap.TotalSupper}</td>
          <td style={{ width : '150px' }}></td>
          <td style={{ width : '170px' }}>PackMeal</td>
          <td >:</td>
          <td style={{ width : '200px', color : 'green' }}>{props.getLaporanRekap.TotalPackMeal}</td>
        </tr> 
        <tr>
          <td style={{fontSize: '12px' , fontWeight: "bold", fontFamily : "Arial"}}>
           Prepared BY
          </td>
        </tr>
        <tr>
          <td>
           
          </td>
        </tr>
        <tr>
          <td style={{fontSize: '12px' , fontWeight: "bold", fontFamily : "Arial"}} >
          {ambil.AdminID}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLeft);
