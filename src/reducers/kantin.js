import {
    GET_KANTIN_LIST,
    GET_KANTIN_DETAIL,
    POST_KANTIN_CREATE,
    PUT_KANTIN_EDIT,
  } from "../actions/KantinAction"
  
  let initialState = {
    getKantinList: false,
    errorKantinList: false,
    getKantinDetail: false,
    errorKantinDetail: false,
    getResponDataKantin: false,
    errorResponDataKantin: false,
  };
  
  const Kantin = (state = initialState, action) => {
    switch (action.type) {
      case GET_KANTIN_LIST:
        return {
          ...state,
          getKantinList: action.payload.data,
          errorKantinList: action.payload.errorMessage,
        };
  
      case GET_KANTIN_DETAIL:
        return {
          ...state,
          getKantinDetail: action.payload.data,
          errorKantinDetail: action.payload.errorMessage,
        };
  
      case POST_KANTIN_CREATE:
        return {
          ...state,
          getResponDataKantin: action.payload.data,
          errorResponDataKantin: action.payload.errorMessage,
        };
  
      case PUT_KANTIN_EDIT:
        return {
          ...state,
          getResponDataKantin: action.payload.data,
          errorResponDataKantin: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Kantin ;
  