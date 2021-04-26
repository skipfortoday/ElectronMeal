import axios from "axios";
import { BaseUrl } from "./userAction";

export const GET_OPT_DEPARTEMEN = "GET_OPT_DEPARTEMEN";
export const GET_OPT_KANTOR= "GET_OPT_KANTOR";
export const GET_OPT_KANTIN= "GET_OPT_KANTIN";


export const getOptDepartemen = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/optDepartemen")
      .then(function (response) {
        dispatch({
          type: GET_OPT_DEPARTEMEN,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_DEPARTEMEN,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptKantor = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/optKantor")
      .then(function (response) {
        dispatch({
          type: GET_OPT_KANTOR,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_KANTOR,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptKantin = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/optKantin")
      .then(function (response) {
        dispatch({
          type: GET_OPT_KANTIN,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_KANTIN,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
