import React from "react";
import './Header.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styled, { css } from 'styled-components';

const COVID19_APP_KEY = "covid19.tracker";

function Header({ displayMode, switchDisplayMode }) {
  function handleSwitchChange() {
    switchDisplayMode();
  }

  const HeaderDiv = styled.div`
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.5);
    color: black !important;
    & > ul > li > a {
      color: black;
    }
    .MuiTypography-body1 {
      color: black;
    }

    {${displayMode && css`
      background-color: #333;
      border: 1px solid #444;
      box-shadow: 0px 5px 10px -7px rgba(255, 255, 255, 0.5);
      & > ul > li > a {
        color: white;
      }
      .MuiTypography-body1 {
        color: white;
      }
    `}
  `;

  return (
    <HeaderDiv className="appheader">
      <ul>
        <li>
          <a href="#Home">MedikalHMS</a>
        </li>
        <li>
        <FormControlLabel        
          control={
          <Switch 
            size="small"
            checked={displayMode}
            onChange={handleSwitchChange} 
            name="checkedA"            
            />
          }
          label={displayMode ? "DarkMode" : "LightMode"}
          title="Light or Dark Mode"
          style={{color: "#fff", marginTop: "10px", marginLeft: "20px"}}
        />
        </li>
        <li className="nav_contact hide-on-mobile" style={{float: "right"}}>
          <a href="#Contact">
            Contact
          </a>          
        </li>
        <li className="hide-on-mobile" style={{float: "right"}}>
          <a href="#Help">
            Help
          </a>          
        </li>
        <li className="hide-on-mobile" style={{float: "right"}}>
          <a className="active1" href="#About">
            About
          </a>          
        </li> 
      </ul>
    </HeaderDiv>
  );
}

export default Header;
