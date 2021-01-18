import React, { useState, useEffect } from "react";
import './Sections.css';
import styled, { css } from 'styled-components';

function Sections() {
  const [displayMode, setDisplayMode] = useState(false);

  useEffect(() => {
    const dm = localStorage.getItem("displaymode");
    const dmBool = (dm == "false") != Boolean(dm);
    setDisplayMode(dmBool);
  }, []);

  const Section = styled.div`
    background-color: #fff;
    color: black;

    ${displayMode &&
    css`
      background-color: #000;
      color: white;
    `}
  `;

  return (
    <Section className="sections">
      <div id="About" className={`sections__about ${displayMode  ? "darktheme" : ""}`}>
        <div className="">
          <h3 style={{ color: "#f75353" }}>About Us</h3>
          <hr />
          <p>
            <br />
            COVID-19 Tracker is part of a toolset that includes a tracker, a
            contact tracing App, an administrative backend for healthcare
            agencies and an analytic console. <br />
            <br />
            It is our contribution to helping to stem the COVID-19 pandemic that
            has ravahed the world in the last year.
            <br />
            We hope that we can contribute our little token to helping
            governments and individuals stay safe and protected.
            <br />
            <br />
            Thanks to everyone on the team that has made this possible. <br />
            <br />
            <hr />
            <br />
            -- Medikal HMS Team
          </p>
        </div>
      </div>
      <div id="Help" className={`sections__help ${displayMode  ? "darktheme" : ""}`}>
        <div className="help__info1">
          <h3 style={{ color: "#f75353" }}>How to use</h3>
          <hr />
          <p>
            <br />
            Select a country from the countries dropdown tool to view tracking
            data from any country. <br />
            <br />
            Click on any of the 3 Info boxes to switch the displayed data to
            either CASES, RECOVERED or DEATHS
            <br />
            <br />
            Both the displayed data, Graphs and Map will change accordingly
            <br />
            <br />
            You can zoom the map to zero in on a location.
            <br />
            <br />
            Click on the colored Circles on the Map to get more info about each
            country
          </p>
        </div>
      </div>
      <div id="Contact" className={`sections__contact ${displayMode  ? "darktheme" : ""}`}>
        <div className="">
          <h3 style={{ color: "#f75353" }}>Contact Us</h3>
          <hr />
          <p>
            <br />
            You can reach us on the channels below:<br /><br />
            <strong>Email:</strong> contact@medikalhms.com<br /><br />
            <strong>Phone:</strong> 09097558551<br /><br />
            <strong>Twitter:</strong> @medikalhms<br />
            <br />
            <hr />
            <br />
            -- Medikal HMS Team
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Sections;
