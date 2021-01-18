import React, { useState, useEffect } from "react";
import './infoBox.css';
import { Card, CardContent, Typography } from "@material-ui/core";
import styled, { css } from 'styled-components';

function InfoBox({ title, cases, active, boxColor, total, ...props }) {
  const [displayMode, setDisplayMode] = useState(false);

  useEffect(() => {
    const dm = localStorage.getItem("displaymode");
    const dmBool = (dm == "false") != Boolean(dm);
    setDisplayMode(dmBool);
  }, []);

  const BoxDiv = styled.div`
    background-color: #fff;
    flex: 1 ;
    cursor: pointer;
    & :not(:last-child) {
      margin-right: 15px;
    }
    & > .MuiCard-root {      
      height: 100% !important;
      margin-right: 15px;
    }

    ${displayMode &&
    css`
      background-color: black !important;      
      color: white;
      & > .MuiCard-root > .MuiCardContent-root > .MuiTypography-colorTextSecondary {
        color: white;
      }
      & > .MuiCard-root {
        background-color: black !important;        
        border-bottom: 1px solid #333;
        border-left: 1px solid #333;
        border-right: 1px solid #333;
        color: white;
      }
      & > MuiTypography-colorTextSecondary {
        color: rgb(255 255 255 / 54%);
      }
      & > .infoBox__total {
        color: white;
      }
    `}
  `;

  return (    
    <BoxDiv>
    <Card onClick={props.onClick} className={`infoBox ${active && boxColor}`}>
      <CardContent>      
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases" style={{ color: props.color }}>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>        
      </CardContent>
    </Card>
    </BoxDiv>
  );
}

export default InfoBox;
