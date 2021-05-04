
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux"


const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
  };
};



const LaporanDetail = (props) => {
  const columns = [
    {
      dataField: "Tanggal",
      text: "Date",
      sort: true,
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
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px' , lineHeight: '100%',textAlign:'center' };
      },
    },
    
    {
      dataField: "JumlahSupper",
      text: "Supper",
      headerStyle: () => {
        return { width: "38px" , fontSize: '20px', lineHeight: '100%',textAlign:'center' };
      },
    },
    {
      dataField: "JumlahPackMeal",
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


  return (
    <BootstrapTable 
      keyField='Tanggal'
      classes='rDetail2' 
      data={ props.getLaporanDetail } 
      columns={ columns } 
      headerClasses='page-header-space'
      rowStyle={ { lineHeight : '75%' , fontFamily: 'Arial' , fontWeight: "bold" , fontSize:"14px", textAlign:'center' } } 
      // defaultSorted= { defaultSorted }
    />
  );
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
};

export default connect(mapStateToProps, null)(LaporanDetail);
