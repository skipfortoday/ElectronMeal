import {  GET_OPT_DEPARTEMEN, GET_OPT_KANTIN, GET_OPT_KANTOR } from "../actions/optAction";

let initialState = {
  getOptDepartemen: false,
  errorOptDepartemen: false,
  getOptKantor: false,
  errorOpKantor: false,
  getOptKantin: false,
  errorOpKantin: false,
};

const Opt = (state = initialState, action) => {
  switch (action.type) {

    case GET_OPT_DEPARTEMEN:
      return {
        ...state,
        getOptDepartemen: action.payload.data,
        errorOptDepartemen: action.payload.errorMessage,
      };

      case GET_OPT_KANTOR:
        return {
          ...state,
          getOptKantor: action.payload.data,
          errorOptKantor: action.payload.errorMessage,
        };

        case GET_OPT_KANTIN:
        return {
          ...state,
          getOptKantin: action.payload.data,
          errorOptKantin: action.payload.errorMessage,
        };
    default:
      return state;
  }
};

export default Opt;
