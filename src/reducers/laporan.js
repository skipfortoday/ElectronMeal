import {

    GET_LAPORAN_DETAIL,
    GET_LAPORAN_REKAP,
    GET_LAPORAN_PERHARI,
    GET_LAPORAN_RPERHARI,
    GET_LAPORAN_PERHARI2,
    GET_LAPORAN_RPERHARI2,
    IS_LOADING,
    RESET_LAPORAN,
    IS_INITIAL,
    IS_EMPETY,
    GET_CEK_DATA,
  } from "../actions/laporanAction";
  
  let initialState = {
    isEmpety:true,
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
    getCekData:false,
    errorCekData:false,
    isLoading:false,
    isInitial:false,
  };
  
  const Laporan = (state = initialState, action) => {
    switch (action.type) {

      case IS_LOADING:
          return {
            ...state,
            isLoading: action.payload.data
          }

          case IS_INITIAL:
            return {
              ...state,
              isInitial: action.payload.data,
              isLoading: true
            }  

            
          case IS_EMPETY:
            return {
              ...state,
              isEmpety: action.payload.data,
            }  


      case RESET_LAPORAN :
      return {
        ...state,
        getLaporanDetail: false,
        getLaporanPerhari: false,
        getLaporanRperhari: false,
        getLaporanPerhari2: false,
        getLaporanRperhari2: false,
        getLaporanRekap:false,
        getResponDataLaporan: false,
      };
  
      case GET_LAPORAN_DETAIL:
        return {
          ...state,
          getLaporanDetail: action.payload.data,
          errorLaporanDetail: action.payload.errorMessage,
          isLoading:false,
          isInitial:true,
        };

        case GET_LAPORAN_REKAP:
          return {
            ...state,
            getLaporanRekap: action.payload.data,
            errorLaporanRekap: action.payload.errorMessage,
          };

          case GET_CEK_DATA:
            return {
              ...state,
              getCekData: action.payload.data,
              errorCekData: action.payload.errorMessage,
            };

          case GET_LAPORAN_PERHARI:
            return {
              ...state,
              getLaporanPerhari: action.payload.data,
              errorLaporanPerhari: action.payload.errorMessage,
              isLoading:false,
              isInitial:true,
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
              isLoading:false,
              isInitial:true,
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
  