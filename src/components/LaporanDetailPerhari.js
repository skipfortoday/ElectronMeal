
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux"
import {  Spinner } from "reactstrap";


const mapStateToProps = (state) => {
  return {
    getLaporanPerhari: state.Laporan.getLaporanPerhari,
    getLaporanRperhari: state.Laporan.getLaporanRperhari,
    errorLaporanPerhari: state.Laporan.errorLaporanPerhari,
  };
};


const LaporanDetailPerhari = (props) => {
  function KantinFormater() {
    return (
      <div style={{textAlign:'center'}}>
      <h6><strong>Kantin :  {props.getLaporanRperhari.NamaKantin}</strong> </h6>
      </div>
    );
  }

  function TanggalFormater() {
    return (
      <div style={{textAlign:'center'}}>
      <h6><strong>{props.getLaporanRperhari.Tanggal}</strong> </h6>
      </div>
    );
  }

  function JumlahLunchFormater() {
    return (
      <div style={{textAlign:'center' , color:'blue'}}>
      <h6><strong>{props.getLaporanRperhari.TotalLunch}</strong>  </h6>
      </div>
    );
  }

  function JumlahSupperFormater() {
    return (
      <div style={{textAlign:'center' , color:'blue'}}>
      <h6><strong> {props.getLaporanRperhari.TotalSupper}</strong>  </h6>
      </div>
    );
  }

  function JumlahPackMealFormater(column, colIndex, { text }) {
    return (
      <div style={{textAlign:'center' , color:'green'}}>
      <h6><strong> {props.getLaporanRperhari.TotalPackMeal}</strong>  </h6>
      </div>
    );
  }
  const columns = [
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      footer: '',
      footerFormatter: KantinFormater,
      headerStyle: () => {
        return { width: "100px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      style: () => {
        return {   fontSize :'18px' ,textAlign:'center',fontWeight: "bold"};
      },
    },
    {
      dataField: "NamaKantor",
      text: "Kantor",
      sort: true,
      footer: '',
      footerFormatter: TanggalFormater,
      headerStyle: () => {
        return { width: "70px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      style: () => {
        return {   fontSize :'14px' ,textAlign:'center'};
      },
    },
    {
      dataField: "Lunch",
      text: "Lunch",
      footer: '',
      footerFormatter: JumlahLunchFormater,
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px' , lineHeight: '100%',textAlign:'center' };
      },
    },
    
    {
      dataField: "Supper",
      text: "Supper",
      footer: '',
      footerFormatter: JumlahSupperFormater,
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px', lineHeight: '100%',textAlign:'center' };
      },
    },
    {
      dataField: "PackMeal",
      text: "PackMeal",
      footer: '',
      footerFormatter: JumlahPackMealFormater,
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px', lineHeight: '100%', textAlign:'center'};
      },
      style: () => {
        return { color: 'green' };
      },

    }
    
  ];
  return (
    <div>
      {props.getLaporanPerhari  ? (
      <div>
      <BootstrapTable 
      id="laporanharian"
      keyField='Nama'
      classes='rDetail2' 
      data={ props.getLaporanPerhari } 
      columns={ columns } 
      headerClasses='page-header-space'
      rowStyle={ { lineHeight : '75%' , fontFamily: 'Arial' , fontWeight: "bold" , fontSize:"14px", textAlign:'center' } } 
    />
        </div>
      ) : (
        <div className="text-center">
          {props.getLaporanPerhari === false ? (
            <h4>No Data</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(LaporanDetailPerhari);
