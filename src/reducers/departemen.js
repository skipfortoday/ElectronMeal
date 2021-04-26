import {
    GET_DEPARTEMEN_LIST,
    GET_DEPARTEMEN_DETAIL,
    POST_DEPARTEMEN_CREATE,
    PUT_DEPARTEMEN_EDIT,
  } from "../actions/DepartemenAction"
  
  let initialState = {
    getDepartemenList: false,
    errorDepartemenList: false,
    getDepartemenDetail: false,
    errorDepartemenDetail: false,
    getResponDataDepartemen: false,
    errorResponDataDepartemen: false,
  };
  
  const Departemen = (state = initialState, action) => {
    switch (action.type) {
      case GET_DEPARTEMEN_LIST:
        return {
          ...state,
          getDepartemenList: action.payload.data,
          errorDepartemenList: action.payload.errorMessage,
        };
  
      case GET_DEPARTEMEN_DETAIL:
        return {
          ...state,
          getDepartemenDetail: action.payload.data,
          errorDepartemenDetail: action.payload.errorMessage,
        };
  
      case POST_DEPARTEMEN_CREATE:
        return {
          ...state,
          getResponDataDepartemen: action.payload.data,
          errorResponDataDepartemen: action.payload.errorMessage,
        };
  
      case PUT_DEPARTEMEN_EDIT:
        return {
          ...state,
          getResponDataDepartemen: action.payload.data,
          errorResponDataDepartemen: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Departemen ;
  