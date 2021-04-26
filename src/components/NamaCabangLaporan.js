import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanHead: state.Laporan.getLaporanHead,
    errorLaporanHead: state.Laporan.errorLaporanHead,
  };
};

const NamaCabangLaporan = (props) => {
  return (

      
    
    <Table borderless size="sm">
    
      <tbody
        style={{ fontSize: "14px", fontWeight: "bold", lineHeight: "60%" , fontFamily : "Arial" }}
      >
        <tr >
        <td style={{ width:"50px" }}>
        <img src="/logo_gdsk.png" alt="Lviors"/>
        </td>
        <td>
         <tr>
         <td>
        </td>
          </tr> 
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr> 
        <tr>
          <td></td>
        </tr>
        <tr>
          <td><h5>PT GOBEL DHARMA SARANA KARYA</h5></td>
        </tr>   
        </td>
        </tr>
       
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(NamaCabangLaporan);
