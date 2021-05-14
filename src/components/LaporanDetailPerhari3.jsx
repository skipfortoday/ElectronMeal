
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux"
import {   Spinner } from "reactstrap";


const mapStateToProps = (state) => {
  return {
    getLaporanPerhari2: state.Laporan.getLaporanPerhari2,
    getLaporanRperhari2: state.Laporan.getLaporanRperhari2,
    errorLaporanPerhari2: state.Laporan.errorLaporanPerhari2,
  };
};


const LaporanDetailPerhari3 = (props) => {

  function KantinFormater() {
    return (
      <div style={{textAlign:'center'}}>
      {props.getLaporanRperhari2.NamaKantin}
      </div>
    );
  }

  function TanggalFormater() {
    return (
      <div style={{textAlign:'center'}}>
     {props.getLaporanRperhari2.Tanggal}
      </div>
    );
  }
  
  function TotalFormater() {
    return (
      <div style={{textAlign:'center'}}>
      Total : 
      </div>
    );
  }

  function JumlahLunchFormater() {
    return (
      <div style={{textAlign:'center' , color:'green'}}>
        Lunch : {props.getLaporanRperhari2.TotalLunch} Supper : {props.getLaporanRperhari2.TotalSupper} PackMeal : {props.getLaporanRperhari2.TotalPackMeal}
      </div>
    );
  }

  const columns = [
    {
      dataField: "NIP",
      text: "NIP",
      sort: true,
      footer: '',
      footerFormatter:KantinFormater,
      headerStyle: () => {
        return { width: "20px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      style: () => {
        return { textAlign:'left'};
      },
    },
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      footer: '',
      footerFormatter: TanggalFormater,
      headerStyle: () => {
        return { width: "60px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      footerStyle: () => {
        return { fontSize: '12  px'  };
      },
      style: () => {
        return { textAlign:'left'};
      },
    },
    {
      dataField: "JamLunch",
      text: "Lunch",
      footer: '',
      headerStyle: () => {
        return { width: "20px", lineHeight: '100%',textAlign:'center', fontSize: '20px' };
      },
    },
    {
      dataField: "JamSupper",
      text: "Supper",
      footer: '',
      footerFormatter: TotalFormater,
      footerStyle: () => {
        return { fontSize: '12px'  };
      },
      headerStyle: () => {
        return { width: "30px" , lineHeight: '100%',textAlign:'center' , fontSize: '20px'};
      },
    },
    {
      dataField: "Departemen",
      text: "Departement",
      sort: true,
      footer: '',
      footerFormatter: JumlahLunchFormater,
      footerStyle: () => {
        return { fontSize: '10.5px'  };
      },
      headerStyle: () => {
        return { width: "50px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      style: () => {
        return {textAlign:'center'};
      },
    },
    {
      dataField: "NamaKantor",
      text: "Enity",
      sort: true,
      footer: '',
      headerStyle: () => {
        return { width: "30px" , fontSize: '20px' ,lineHeight: '100%', textAlign:'center' };
      },
      style: () => {
        return { textAlign:'center'};
      },
    },
    {
      dataField: "Status",
      text: "Status  ",
      sort: true,
      footer: '',
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px', lineHeight: '100%', textAlign:'center'};
      },
      style: () => {
        return { textAlign:'center' };
      },

    }
    
  ];

  return (
    <div>
      {props.getLaporanPerhari2  ? (
        
        <div>
      < BootstrapTable 
      id='laporanharian3'
      keyField='Nama'
      classes='rDetail2' 
      data={ props.getLaporanPerhari2 } 
      columns={ columns } 
      headerClasses='page-header-space'
      rowStyle={ { lineHeight : '75%' , fontFamily: 'Arial' , fontSize:"12px", textAlign:'center' } } 
      // defaultSorted= { defaultSorted }
    />
        </div>
      ) : (
        <div className="text-center">
          {props.getLaporanPerhari2 ?  (
            <h4>No Data</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(LaporanDetailPerhari3);
