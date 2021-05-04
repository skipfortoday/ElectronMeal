import axios from "axios";
import { BaseUrl } from "./userAction";

export const GET_KANTIN_LIST = "GET_KANTIN_LIST";
export const GET_KANTIN_DETAIL = "GET_KANTIN_DETAIL";
export const POST_KANTIN_CREATE = "POST_KANTIN_CREATE";
export const PUT_KANTIN_EDIT = "PUT_KANTIN_EDIT";



export const getKantinList = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/Kantin")
      .then(function (response) {
        dispatch({
          type: GET_KANTIN_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KANTIN_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getKantinDetail = (SNMesin) => {
  return (dispatch) => {
    axios
      .get(
        "http://"+BaseUrl+"/api/Kantin/"+SNMesin
      )
      .then(function (response) {
        dispatch({
          type: GET_KANTIN_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_KANTIN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postKantinCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://"+BaseUrl+"/api/Kantin",
        data
      )
      .then(function (response) {
        console.log(response);
        dispatch({
          type: POST_KANTIN_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_KANTIN_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putKantinUpdate = (data, SNMesin) => {
  return (dispatch) => {
    axios
      .put(
        "http://"+BaseUrl+"/api/Kantin/"+SNMesin,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_KANTIN_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_KANTIN_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteKantin = (SNMesin) => {
  return (dispatch) => {
    axios
      .delete(
         "http://"+BaseUrl+"/api/Kantin/"+SNMesin
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataKantin = () => {
  return (dispatch) => {
    dispatch({
      type: GET_KANTIN_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_KANTIN_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};
