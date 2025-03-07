import React from "react";
import '../../App.css'
import './Header.styles.css';  
import { Button } from "@mui/material";



function Header() {

    const linkTo = (link) =>{
      window.location.assign(link);
    }

    return (
      <div className="header-container">
        <div className="base-container">
        <div className="base-container__base-body"> 
          <div className="header__button-container">
          <Button variant="contained" onClick={()=>linkTo('/add-client')}>Clients</Button>
          <Button variant="contained" onClick={()=>linkTo('/add-box')}>Boxes</Button>
          <Button variant="contained" onClick={()=>linkTo('/add-mark')}>Marks</Button>
          </div>
        </div>
        </div>
      </div>
    );
  };

  export default Header;
  