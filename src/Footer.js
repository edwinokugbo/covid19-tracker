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

  const FooterDiv = styled.div`
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.5);
    color: black;
    & > ul > li > a {
      color: black;
    }

    {${displayMode && css`
      background-color: #333;
      border: 1px solid #444;
      box-shadow: 0px 5px 10px -7px rgba(255, 255, 255, 0.5);
      & > ul > li > a {
        color: white;
      }
    `}
  `;

  return (
    <FooterDiv className="appheader">
      <ul>
        <li className="nav_contact" style={{float: "right"}}>
          <a href="#Contact">
            Contact
          </a>          
        </li>
        <li style={{float: "right"}}>
          <a href="#Help">
            Help
          </a>          
        </li>
        <li style={{float: "right"}}>
          <a href="#About">
            About
          </a>          
        </li> 
      </ul>
    </FooterDiv>
  );
}

export default Header;
