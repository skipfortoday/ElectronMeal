import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {  Button, Row, Col, Spinner , Card} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteCabang } from "../actions/cabangAction";

const { SearchBar } = Search;

const handleClick = (dispatch, KodeCabang) => {
  
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteCabang(KodeCabang))
      swal("Data Cabang Sukses dihapus", {
        icon: "success",
      });window.location.reload();
    } else {
      swal("Data gagal dihapus");
    }
  });
}


const defaultSorted = [
  {
    dataField: "KodeCabang",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getCabangList: state.Cabang.getCabangList,
    errorCabangList: state.Cabang.errorCabangList,
  };
};

const CabangComponent = (props) => {

  const columns = [
    {
      dataField: "KantorID",
      text: "KantorID",
      sort: true,
      headerStyle: () => {
        return { width: "75px" , backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
    },
    {
      dataField: "NamaKantor",
      text: "Nama Kantor",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
    },
    {
      dataField: "KeteranganKantor",
      text: "Keterangan Kantor", 
      sort: true,
      headerStyle: () => {
        return { width: "200px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
      
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "40px", backgroundColor:"#fec107" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <a href={"../cabang/" + row.KantorID}>
              <Button  color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </a>

            <Link to={"/cabang#"}>
            <Button  color="warning" className="mr-2" onClick={() => handleClick(props.dispatch, row.KantorID)}>
              <FontAwesomeIcon icon={faTrash} /> 
            </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  
  return (
    <div>
      {props.getCabangList ? (
        <ToolkitProvider
          bootstrap4
          keyField="KodeCabang"
          data={props.getCabangList}
          columns={columns}
          rowStyle={ {  fontWeight: "bold" } } 
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
              <Row>
           
                <Col>
                  <div className="float-right">
                    <SearchBar {...props.searchProps} placeholder="Search .." />
                  </div>
                </Col>
              </Row>

              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
              </Card>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorCabangList ? (
            <h4>{props.errorCabangList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(CabangComponent);
