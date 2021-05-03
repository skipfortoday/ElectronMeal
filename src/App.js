import React, { useReducer,createContext } from "react";
import { BrowserRouter, Route , Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import CabangContainer from "./containers/CabangContainer";
import LaporanDetailContainer from "./containers/LaporanDetailContainer";
import LoginContainer from "./containers/LoginContainer";
import LandingPageContainer from "./containers/LandingPageContainer";
import AdminContainer from "./containers/AdminContainer";
import CreateAdminContainer from "./containers/CreateAdminContainer";
import EditAdminContainer from "./containers/EditAdminContainer";
import ListLaporanContainer from "./containers/ListLaporanContainer";
import DepartemenContainer from "./containers/DepartemenContainer";
import KantinContainer from "./containers/KantinContainer";
import LaporanPerhariContainer from "./containers/LaporanPerhariContainer";
import LapDetPerhariContainer from "./containers/LapDetPerhariContainer";
import LapDetPerhariContainer2 from "./containers/LapDetPerhariContainer2";
import JadwalContainer from "./containers/JadwalContainer";
import LaporanPerhariContainer2 from "./containers/LaporanPerhariContainer2";


//Context
export const AuthContext = createContext()

//Inisiasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role
      }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    
    default:
      return state
  }
}


function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <BrowserRouter>
          <Switch>
        <AuthContext.Provider value={{
          state,
          dispatch
        }}>
          
          <Route path="/" exact component={HomeContainer} />

          <Route path="/login" exact component={LoginContainer} />

          <Route path="/create" exact component={CreateUserContainer} />

          <Route path="/edit/:UserID" exact component={EditUserContainer} />

          <Route path="/laporan" exact component={ListLaporanContainer} />
          <Route path="/laporandetail/:UserID/:TglAwal/:TglAkhir" exact component={LaporanDetailContainer} />

          <Route path="/laporanperhari" exact component={LaporanPerhariContainer} />
          <Route path="/laporandetailperhari/:UserID/:Tanggal/:Kantor" exact component={LapDetPerhariContainer} />

          <Route path="/laporanperhari2" exact component={LaporanPerhariContainer2} />
          <Route path="/laporandetailperhari2/:UserID/:Tanggal" exact component={LapDetPerhariContainer2} />

          <Route path="/cabang" exact component={CabangContainer} />
          <Route path="/cabang/:KodeCabang" exact component={CabangContainer} />

          <Route path="/departemen" exact component={DepartemenContainer} />
          <Route path="/departemen/:DepartemenID" exact component={DepartemenContainer} />

          <Route path="/kantin" exact component={KantinContainer} />
          <Route path="/kantin/:SNMesin" exact component={KantinContainer} />

          <Route path="/jadwal/:ID" exact component={JadwalContainer} />

          <Route path="/superadmin" exact component={AdminContainer} />
          <Route path="/superadmin/create" exact component={CreateAdminContainer} />
          <Route path="/superadmin/edit/:AdminID" exact component={EditAdminContainer} />


          <Route path="/home" exact component={LandingPageContainer} />

          </AuthContext.Provider>
          </Switch>
        </BrowserRouter>

    );
  
}
export default App;