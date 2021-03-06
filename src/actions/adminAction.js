import axios from "axios";
import { BaseUrl } from "./userAction";

export const GET_ADMIN_LIST = "GET_ADMIN_LIST";
export const GET_ADMIN_DETAIL = "GET_ADMIN_DETAIL";
export const POST_ADMIN_CREATE = "POST_ADMIN_CREATE";
export const PUT_ADMIN_EDIT = "PUT_ADMIN_EDIT";



export const getAdminList = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/superadmin")
      .then(function (response) {
        dispatch({
          type: GET_ADMIN_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_ADMIN_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getAdminDetail = (AdminID) => {
  return (dispatch) => {
    axios
      .get(
        "http://"+BaseUrl+"/api/superadmin/"+ AdminID
      )
      .then(function (response) {
        dispatch({
          type: GET_ADMIN_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_ADMIN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postAdminCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://"+BaseUrl+"/api/superadmin/",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_ADMIN_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_ADMIN_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putAdminUpdate = (data,AdminID) => {
  return (dispatch) => {
    axios
      .put(
        "http://"+BaseUrl+"/api/superadmin/"+AdminID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_ADMIN_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_ADMIN_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteAdmin = (AdminID) => {
  return (dispatch) => {
    axios
      .delete(
         "http://"+BaseUrl+"/api/superadmin/"+AdminID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


