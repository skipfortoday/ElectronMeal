import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanRperhari: state.Laporan.getLaporanRperhari,
    errorLaporanRperhari: state.Laporan.errorLaporanRperhari,
  };
};

  
const RekapLeft3 = (props) => {
  let ambil = JSON.parse(localStorage.getItem('user'));
  return (
    <Table >
      <tbody style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "Arial"}}>
        <tr style={{ lineHeight : '9px' }} >
        <td style={{ width : '60%' }}>TOTAL</td>
          <td style={{ width : '100px' }}>Lunch</td>
          <td >:</td>
          <td>{props.getLaporanRperhari.TotalLunch}</td>
          <td style={{ width : '120px' }}>Supper</td>
          <td >:</td>
          <td >{props.getLaporanRperhari.TotalSupper}</td>
          <td style={{ width : '170px' }}>PackMeal</td>
          <td >:</td>
          <td style={{ width : '200px', color : 'green' }}>{props.getLaporanRperhari.TotalPackMeal}</td>
          <td style={{ width : '50px' }}></td>
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

export default connect(mapStateToProps, null)(RekapLeft3);
