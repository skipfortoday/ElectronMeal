import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,

  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LogoutComponent from "./LogoutComponent";

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let ambil = JSON.parse(localStorage.getItem('user'));


  return (
    <div>
      
      <Navbar color="dark" dark expand="md">
      <img src="/LogoLaporan40x29.png" alt="logodarkgold"/>
          <NavbarBrand> </NavbarBrand>
          <NavbarBrand> Meal Count App </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>    
                <Link to="/">
                <NavLink> Pegawai </NavLink>
                </Link>
              </NavItem>
              {/* <NavItem>
              <a href={"/izin"}>
                <NavLink>Status Absensi </NavLink>
               </a>
              </NavItem> */}
              <NavItem>
                <Link to="/jadwal/1">
                <NavLink> Jadwal </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/departemen">
                <NavLink>Departemen </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cabang">
                <NavLink>Kantor </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/kantin">
                <NavLink>Kantin </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <Link to={"/laporanperhari"}>
                <NavLink> Laporan Harian</NavLink>
               </Link>
              </NavItem>
              <NavItem>
              <Link to={"/laporanperhari2"}>
                <NavLink> Laporan Harian2</NavLink>
               </Link>
              </NavItem>    
              <NavItem>
              <Link to={"/laporan"}>
                <NavLink> Laporan Bulanan</NavLink>
               </Link>
              </NavItem> 
            </Nav>
            <Nav navbar> 
            <NavItem>
            <NavItem>
                
                <NavbarBrand> {ambil.AdminID}</NavbarBrand>
        
              </NavItem>   
            </NavItem>
            </Nav>  

          <a href={"/home"}>
           <LogoutComponent/>
          </a>
          </Collapse>
      </Navbar>
      

    </div>
  );
};

export default NavbarComponent;
