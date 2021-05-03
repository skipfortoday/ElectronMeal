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
import { deleteDataDepartemen, deleteDepartemen, getDepartemenList } from "../actions/DepartemenAction";

const { SearchBar } = Search;

const handleClick = (dispatch, DepartemenID) => {
  
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteDepartemen(DepartemenID))
      swal("Data Departemen Sukses dihapus", {
        icon: "success",
      }).then(() => {
        dispatch(getDepartemenList())
        dispatch(deleteDataDepartemen())
      });
    } else {
      swal("Data gagal dihapus");
    }
  });
}


const defaultSorted = [
  {
    dataField: "DepartemenID",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getDepartemenList: state.Departemen.getDepartemenList,
    errorDepartemenList: state.Departemen.errorDepartemenList,
  };
};

const DepartemenComponent = (props) => {

  const columns = [
    {
      dataField: "DepartemenID",
      text: "DepartemenID",
      sort: true,
      headerStyle: () => {
        return { width: "75px" , backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },
    {
      dataField: "NamaDepartemen",
      text: "Nama Departemen",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },
    {
      dataField: "KeteranganDepartemen",
      text: "Keterangan Departemen", 
      sort: true,
      headerStyle: () => {
        return { width: "200px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "40px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"../Departemen/" + row.DepartemenID}>
              <Button  color="warning" className="mr-2" size='sm'>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>

            <Link to={"/Departemen#"}>
            <Button  color="warning" className="mr-2" size='sm' onClick={() => handleClick(props.dispatch, row.DepartemenID)}>
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
      {props.getDepartemenList ? (
        <ToolkitProvider
          bootstrap4
          keyField="DepartemenID"
          data={props.getDepartemenList}
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
                pagination={paginationFactory({sizePerPage:'15'})}
              />
              </Card>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorDepartemenList ? (
            <h4>{props.errorDepartemenList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(DepartemenComponent);
