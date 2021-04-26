import axios from "axios";
import { BaseUrl } from "./userAction";

export const GET_DEPARTEMEN_LIST = "GET_DEPARTEMEN_LIST";
export const GET_DEPARTEMEN_DETAIL = "GET_DEPARTEMEN_DETAIL";
export const POST_DEPARTEMEN_CREATE = "POST_DEPARTEMEN_CREATE";
export const PUT_DEPARTEMEN_EDIT = "PUT_DEPARTEMEN_EDIT";



export const getDepartemenList = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/Departemen")
      .then(function (response) {
        dispatch({
          type: GET_DEPARTEMEN_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_DEPARTEMEN_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getDepartemenDetail = (DepartemenID) => {
  return (dispatch) => {
    axios
      .get(
        "http://"+BaseUrl+"/api/Departemen/"+DepartemenID
      )
      .then(function (response) {
        dispatch({
          type: GET_DEPARTEMEN_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_DEPARTEMEN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postDepartemenCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://"+BaseUrl+"/api/Departemen",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_DEPARTEMEN_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_DEPARTEMEN_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putDepartemenUpdate = (data, DepartemenID) => {
  return (dispatch) => {
    axios
      .put(
        "http://"+BaseUrl+"/api/Departemen/"+DepartemenID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_DEPARTEMEN_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_DEPARTEMEN_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteDepartemen = (DepartemenID) => {
  return (dispatch) => {
    axios
      .delete(
         "http://"+BaseUrl+"/api/Departemen/"+DepartemenID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataDepartemen = () => {
  return (dispatch) => {
    dispatch({
      type: GET_DEPARTEMEN_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_DEPARTEMEN_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};
