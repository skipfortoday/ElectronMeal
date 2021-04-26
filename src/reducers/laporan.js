import {

    GET_LAPORAN_DETAIL,
    GET_LAPORAN_REKAP,
    GET_LAPORAN_PERHARI,
    GET_LAPORAN_RPERHARI,
    GET_LAPORAN_PERHARI2,
    GET_LAPORAN_RPERHARI2,
  } from "../actions/laporanAction";
  
  let initialState = {
    getLaporanDetail: false,
    errorLaporanDetail: false,
    getLaporanPerhari: false,
    errorLaporanPerhari: false,
    getLaporanRperhari: false,
    errorLaporanRperhari: false,
    getLaporanPerhari2: false,
    errorLaporanPerhari2: false,
    getLaporanRperhari2: false,
    errorLaporanRperhari2: false,
    getLaporanRekap:false,
    errorLaporanRekap:false,
    getResponDataLaporan: false,
    errorResponDataLaporan: false,

  };
  
  const Laporan = (state = initialState, action) => {
    switch (action.type) {
  
      case GET_LAPORAN_DETAIL:
        return {
          ...state,
          getLaporanDetail: action.payload.data,
          errorLaporanDetail: action.payload.errorMessage,
        };

        case GET_LAPORAN_REKAP:
          return {
            ...state,
            getLaporanRekap: action.payload.data,
            errorLaporanRekap: action.payload.errorMessage,
          };

          case GET_LAPORAN_PERHARI:
            return {
              ...state,
              getLaporanPerhari: action.payload.data,
              errorLaporanPerhari: action.payload.errorMessage,
            };

            case GET_LAPORAN_RPERHARI:
          return {
            ...state,
            getLaporanRperhari: action.payload.data,
            errorLaporanRperhari: action.payload.errorMessage,
          };

          case GET_LAPORAN_PERHARI2:
            return {
              ...state,
              getLaporanPerhari2: action.payload.data,
              errorLaporanPerhari2: action.payload.errorMessage,
            };

            case GET_LAPORAN_RPERHARI2:
          return {
            ...state,
            getLaporanRperhari2: action.payload.data,
            errorLaporanRperhari2: action.payload.errorMessage,
          };

  
      default:
        return state;
    }
  };
  
  export default Laporan;
  