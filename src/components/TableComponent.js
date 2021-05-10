import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Button,
  Row,
  Col,
  Spinner,
  Card,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import {
  deleteUser, getUsersList,
} from "../actions/userAction";

const { SearchBar } = Search;
const handleClick = (dispatch, ID) => {
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteUser(ID));
      swal("Data User Sukses dihapus", {
        icon: "success",
      }).then(()=>{dispatch(getUsersList())})
    } else {
      swal("Data gagal dihapus");
    }
  });
};


const defaultSorted = [
  {
    dataField: "UserID",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getUsersList: state.users.getUsersList,
    errorUsersList: state.users.errorUsersList,
  };
};

const TableComponent = (props) => {
  const columns = [
    {
      dataField: "PIN",
      text: "PIN",
      sort: true,
      headerStyle: () => {
        return { width: "10%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold" , padding: "5px" };
      },
    },
    {
      dataField: "NIP",
      text: "NIP",
      sort: true,
      headerStyle: () => {
        return { width: "10%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"};
      }
    },
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      headerStyle: () => {
        return { width: "15%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold" ,padding: "5px"};
      },
    },
    {
      dataField: "Jabatan",
      text: "Jabatan",
      sort: true,
      headerStyle: () => {
        return { width: "15%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"};
      },
    },
    {
      dataField: "NamaDepartemen",
      text: "Departemen",
      sort: true,
      headerStyle: () => {
        return { width: "15%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },
    {
      dataField: "NamaKantor",
      text: "Kantor",
      sort: true,
      headerStyle: () => {
        return { width: "10%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },

    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "10%", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"};
      },
      formatter: (rowContent, row) => {
        return (
          <div>

            <Link to={"edit/" + row.PIN}>
              <Button color="warning" className="mr-2" size="sm">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>
            <Button
              color="warning"
              className="mr-2"
              onClick={() => handleClick(props.dispatch, row.PIN)}
              size="sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      
      {props.getUsersList ? (
        <ToolkitProvider
          bootstrap4
          keyField="UserID"
          data={props.getUsersList}
          columns={columns}
          style={{ fontWeight: "bold",padding: "2px"}}
          defaultSorted={defaultSorted}
          search
          exportCSV
        >
          {(props) => (
            <div>
              <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
                <Row>
                  <Col>
                    <Link to="/create">
                      <Button color="warning" className="mr-2">
                        <FontAwesomeIcon icon={faUserPlus} /> Tambah Pegawai
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <div className="float-right">
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search .."
                      />
                    </div>
                  </Col>
                </Row>

                <BootstrapTable
                  id="table-to-xls"
                  {...props.baseProps}
                  pagination={paginationFactory({sizePerPage:'15'})}
                />
              </Card>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorUsersList ? (
            <h4>{props.errorUsersList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(TableComponent);
