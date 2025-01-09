import React from "react";
import '../../App.css'
import './Header.styles.css';  
import { Button } from "@mui/material";

function Header() {

    return (
      <div className="header-container">
        <div className="base-container">
        <div className="base-container__base-body"> 
          <div className="header__button-container">
          <Button variant="contained">New client</Button>
          <Button variant="contained">New box</Button>
          <Button variant="contained">New Mark</Button>
          </div>
        </div>
        </div>
      </div>
    );
  };

  export default Header;
  