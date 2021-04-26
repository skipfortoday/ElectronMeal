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

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      
      <Navbar color="dark" dark expand="md">
      <img src="/LogoLaporan40x29.png" alt="logodarkgold"/>
          <NavbarBrand> </NavbarBrand>
          <NavbarBrand> Meal Count App</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto" navbar>
            </Nav>
            <Nav navbar> 
            <NavItem>
                <Link to="/Login">
                <NavLink> Login</NavLink>
                </Link>
              </NavItem>
            </Nav>  
          </Collapse>
      </Navbar>
      

    </div>
  );
};

export default NavbarComponent;
