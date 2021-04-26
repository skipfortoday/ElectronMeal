import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanRperhari2: state.Laporan.getLaporanRperhari2,
    errorLaporanRperhari2: state.Laporan.errorLaporanRperhari2,
  };
};

  
const RekapLeft2 = (props) => {
  let ambil = JSON.parse(localStorage.getItem('user'));
  return (
    <Table striped>
      <tbody style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "Arial"}}>
        <tr style={{ lineHeight : '9px' }} >
        <td style={{ width : '60%' }}>TOTAL</td>
          <td style={{ width : '100px' }}>Lunch</td>
          <td >:</td>
          <td>{props.getLaporanRperhari2.TotalLunch}</td>
          <td style={{ width : '120px' }}>Supper</td>
          <td >:</td>
          <td >{props.getLaporanRperhari2.TotalSupper}</td>
          <td style={{ width : '170px' }}>PackMeal</td>
          <td >:</td>
          <td style={{ width : '200px', color : 'green' }}>{props.getLaporanRperhari2.TotalPackMeal}</td>
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

export default connect(mapStateToProps, null)(RekapLeft2);
