
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux"
import {  Spinner } from "reactstrap";


const mapStateToProps = (state) => {
  return {
    getLaporanPerhari: state.Laporan.getLaporanPerhari,
    errorLaporanPerhari: state.Laporan.errorLaporanPerhari,
  };
};


const LaporanDetailPerhari = (props) => {
  const columns = [
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
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
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px' , lineHeight: '100%',textAlign:'center' };
      },
    },
    
    {
      dataField: "Supper",
      text: "Supper",
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px', lineHeight: '100%',textAlign:'center' };
      },
    },
    {
      dataField: "PackMeal",
      text: "PackMeal",
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
