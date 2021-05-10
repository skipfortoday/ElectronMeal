
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux"

const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getLaporanRekap: state.Laporan.getLaporanRekap,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
  };
};


const LaporanDetail = (props) => {
  function TglFormater(column, colIndex, { text }) {
    return (
      <h6><strong>{props.getLaporanRekap.NamaKantin}  :</strong> {props.getLaporanRekap.TglAwal} - {props.getLaporanRekap.TglAkhir} </h6>
    );
  }

  function JumlahLunchFormater(column, colIndex, { text }) {
    return (
      <div style={{textAlign:'center' , color:'blue'}}>
      <h6><strong> {props.getLaporanRekap.TotalLunch}</strong>  </h6>
      </div>
    );
  }

  function JumlahSupperFormater(column, colIndex, { text }) {
    return (
      <div style={{textAlign:'center' , color:'blue'}}>
      <h6><strong> {props.getLaporanRekap.TotalSupper}</strong>  </h6>
      </div>
    );
  }

  function JumlahPackMealFormater(column, colIndex, { text }) {
    return (
      <div style={{textAlign:'center' , color:'green'}}>
      <h6><strong> {props.getLaporanRekap.TotalPackMeal}</strong>  </h6>
      </div>
    );
  }
  
  
  
  const columns = [
    {
      dataField: "Tanggal",
      text: "Date",
      sort: true,
      footer: '',
      footerFormatter: TglFormater,
      headerStyle: () => {
        return { width: "50px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      style: () => {
        return { fontSize :'12px' ,textAlign:'center',fontWeight: "bold"};
      },
    },
    {
      dataField: "JumlahLunch",
      text: "Lunch",
      footer: '',
      footerFormatter: JumlahLunchFormater,
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px' , lineHeight: '100%',textAlign:'center' };
      },
    },
    
    {
      dataField: "JumlahSupper",
      text: "Supper",
      footer: 'Footer 3',
      footerFormatter: JumlahSupperFormater,
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px', lineHeight: '100%',textAlign:'center' };
      },
    },
    {
      dataField: "JumlahPackMeal",
      text: "PackMeal",
      footer: 'Footer 3',
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
    <BootstrapTable 
      id="laporantgl"
      keyField='Tanggal'
      classes='rDetail2' 
      data={ props.getLaporanDetail } 
      columns={ columns } 
      headerClasses='page-header-space'
      rowStyle={ { lineHeight : '75%' , fontFamily: 'Arial' , fontWeight: "bold" , fontSize:"14px", textAlign:'center' } } 
    />
    
  );
};

export default connect(mapStateToProps, null)(LaporanDetail);
