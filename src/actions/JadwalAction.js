import axios from "axios";
import { BaseUrl } from "./userAction";

export const GET_JADWAL_LIST = "GET_JADWAL_LIST";
export const GET_JADWAL_DETAIL = "GET_JADWAL_DETAIL";
export const POST_JADWAL_CREATE = "POST_JADWAL_CREATE";
export const PUT_JADWAL_EDIT = "PUT_JADWAL_EDIT";



export const getJadwalList = () => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/Jadwal")
      .then(function (response) {
        dispatch({
          type: GET_JADWAL_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_JADWAL_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getJadwalDetail = (SNMesin) => {
  return (dispatch) => {
    axios
      .get(
        "http://"+BaseUrl+"/api/Jadwal/"+SNMesin
      )
      .then(function (response) {
        dispatch({
          type: GET_JADWAL_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_JADWAL_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postJadwalCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://"+BaseUrl+"/api/Jadwal",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_JADWAL_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_JADWAL_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putJadwalUpdate = (data, ID) => {
  return (dispatch) => {
    axios
      .put(
        "http://"+BaseUrl+"/api/Jadwal/"+ID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_JADWAL_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_JADWAL_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteJadwal = (SNMesin) => {
  return (dispatch) => {
    axios
      .delete(
         "http://"+BaseUrl+"/api/Jadwal/"+SNMesin
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataJadwal = () => {
  return (dispatch) => {
    dispatch({
      type: GET_JADWAL_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_JADWAL_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};
