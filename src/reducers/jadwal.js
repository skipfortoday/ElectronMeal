import {
    GET_JADWAL_LIST,
    GET_JADWAL_DETAIL,
    POST_JADWAL_CREATE,
    PUT_JADWAL_EDIT,
  } from "../actions/JadwalAction"
  
  let initialState = {
    getJadwalList: false,
    errorJadwalList: false,
    getJadwalDetail: false,
    errorJadwalDetail: false,
    getResponDataJadwal: false,
    errorResponDataJadwal: false,
  };
  
  const Jadwal = (state = initialState, action) => {
    switch (action.type) {
      case GET_JADWAL_LIST:
        return {
          ...state,
          getJadwalList: action.payload.data,
          errorJadwalList: action.payload.errorMessage,
        };
  
      case GET_JADWAL_DETAIL:
        return {
          ...state,
          getJadwalDetail: action.payload.data,
          errorJadwalDetail: action.payload.errorMessage,
        };
  
      case POST_JADWAL_CREATE:
        return {
          ...state,
          getResponDataJadwal: action.payload.data,
          errorResponDataJadwal: action.payload.errorMessage,
        };
  
      case PUT_JADWAL_EDIT:
        return {
          ...state,
          getResponDataJadwal: action.payload.data,
          errorResponDataJadwal: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Jadwal ;
  