
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
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

  

  // const defaultSorted = [{
  //   dataField: 'Tanggal',
  //   order: 'asc'
  // }];
  

  const options = {
    firstPageText: 'OK',
    sizePerPageList: [{
      text: 'OK', value: 100
    }] // A numeric array is also available. the purpose of above example is custom the text
  };
  
  /*DatangID: 105
JamKeluar: "11:31:00"
JamKembali: "12:31:00"
KeluarID: 1
Keterangan: "undefined"
KeteranganKembali: null
TotalKeluar: null*/


  // return (
    // <BootstrapTable 
    //   keyField='Nama'
    //   classes='rDetail2' 
    //   data={ props.getLaporanPerhari } 
    //   columns={ columns } 
    //   headerClasses='page-header-space'
    //   rowStyle={ { lineHeight : '75%' , fontFamily: 'Arial' , fontWeight: "bold" , fontSize:"14px", textAlign:'center' } } 
    //   pagination={paginationFactory(options) }
    //   // defaultSorted= { defaultSorted }
    // />
  // );
  /*return (
    <Container>
      {props.getLaporanList ? (
        <ToolkitProvider
          bootstrap4
          keyField="UserID"
          data={props.getLaporanList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div >


              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorLaporanList ? (
            <h4>{props.errorLaporanList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );*/
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
      pagination={paginationFactory(options) }
      // defaultSorted= { defaultSorted }
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
