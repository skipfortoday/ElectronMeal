import axios from "axios";
import { BaseUrl } from "./userAction";

export const GET_LAPORAN_DETAIL = "GET_LAPORAN_DETAIL";
export const GET_LAPORAN_PERHARI = "GET_LAPORAN_PERHARI";
export const GET_LAPORAN_REKAP = "GET_LAPORAN_REKAP";
export const GET_LAPORAN_RPERHARI = "GET_LAPORAN_RPERHARI";
export const GET_LAPORAN_PERHARI2 = "GET_LAPORAN_PERHARI2";
export const GET_LAPORAN_RPERHARI2 = "GET_LAPORAN_RPERHARI2";
export const IS_LOADING = "IS_LOADING";
export const IS_INITIAL = "IS_INITIAL";
export const IS_EMPETY = "IS_EMPETY";
export const RESET_LAPORAN = "RESET_LAPORAN";
export const GET_CEK_DATA = "GET_CEK_DATA";


export const setLoading = (val) => {
  return (dispatch) => {
    dispatch({
      type:IS_LOADING,
      payload:{
        data:val
      }
    })
  }
}

export const isInitial = (value) => {
  return (dispatch) => {
    dispatch({
      type:IS_INITIAL,
      payload:{
        data:value
      }
    })
  }
}

export const isEmpety= (value) => {
  return (dispatch) => {
    dispatch({
      type:IS_EMPETY,
      payload:{
        data:value
      }
    })
  }
}


export const resetLaporan = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_LAPORAN,
    });
  }
}


export const getLaporanDetail = (UserID,TglAwal,TglAkhir) => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/ReportPertanggal/"+UserID+"&"+TglAwal+"&"+TglAkhir)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_DETAIL,
          payload: {
            data: response.data.results,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getLaporanRekap = (UserID,TglAwal,TglAkhir) => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/ReportPertanggal/"+UserID+"&"+TglAwal+"&"+TglAkhir)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_REKAP,
          payload: {
            data: response.data.Rekap,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_REKAP,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getCekData= (UserID,TglAwal,TglAkhir) => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/cekdata/"+UserID+"&"+TglAwal+"&"+TglAkhir)
      .then(function (response) {
        dispatch({
          type: GET_CEK_DATA,
          payload: {
            data: response.data ,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_CEK_DATA,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const getLaporanPerhari = (UserID,Tanggal,Kantor) => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/ReportPerhari/"+UserID+"&"+Tanggal+"&"+Kantor)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_PERHARI,
          payload: {
            data: response.data.results,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_PERHARI,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getLaporanRperhari = (UserID,Tanggal,Kantor) => {
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/ReportPerhari/"+UserID+"&"+Tanggal+"&"+Kantor)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_RPERHARI,
          payload: {
            data: response.data.Rekap,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_RPERHARI,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getLaporanPerhari2 = (UserID,Tanggal) => {
  console.log(UserID)
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/ReportPerhari2/"+UserID+"&"+Tanggal)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_PERHARI2,
          payload: {
            data: response.data.results,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_PERHARI2,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getLaporanRperhari2 = (UserID,Tanggal) => {
  console.log(UserID)
  return (dispatch) => {
    axios
      .get("http://"+BaseUrl+"/api/ReportPerhari2/"+UserID+"&"+Tanggal)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_RPERHARI2,
          payload: {
            data: response.data.Rekap,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_RPERHARI2,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};