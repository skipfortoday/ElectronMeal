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
import { deleteDataKantin, deleteKantin, getKantinList } from "../actions/KantinAction";

const { SearchBar } = Search;

const handleClick = (dispatch, SNMesin) => {
  
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteKantin(SNMesin))
      swal("Data Kantin Sukses dihapus", {
        icon: "success",
      }).then(() => {
        dispatch(getKantinList())
        dispatch(deleteDataKantin())
      });
    } else {
      swal("Data gagal dihapus");
    }
  });
}


const defaultSorted = [
  {
    dataField: "SNMesin",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getKantinList: state.Kantin.getKantinList,
    errorKantinList: state.Kantin.errorKantinList,
  };
};

const KantinComponent = (props) => {

  const columns = [
    {
      dataField: "SNMesin",
      text: "SNMesin",
      sort: true,
      headerStyle: () => {
        return { width: "75px" , backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },
    {
      dataField: "NamaKantin",
      text: "Nama Kantin",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight: "bold",padding: "5px"  };
      },
    },
    {
      dataField: "KeteranganKantin",
      text: "Keterangan Kantin", 
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
            <Link to={"../Kantin/" + row.SNMesin}>
              <Button  color="warning" className="mr-2" size='sm'>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>

            <Link to={"/Kantin#"}>
            <Button  color="warning" className="mr-2" size='sm' onClick={() => handleClick(props.dispatch, row.SNMesin)}>
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
      {props.getKantinList ? (
        <ToolkitProvider
          bootstrap4
          keyField="SNMesin"
          data={props.getKantinList}
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
          {props.errorKantinList ? (
            <h4>{props.errorKantinList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(KantinComponent);
