import { combineReducers } from 'redux'
import users from './users'
import Laporan from './laporan'
import Cabang from './cabang.js'
import Departemen from './departemen.js'
import Kantin from './kantin.js'
import Jadwal from './jadwal.js'
import Opt from './opt.js'
import Admin from './admin.js'
import Login from './login.js'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    Cabang,Laporan, users, Opt, Login,Admin, Departemen, Kantin,Jadwal,
    form: formReducer
})