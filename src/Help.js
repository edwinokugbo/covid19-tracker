import React from "react";
import "./Help.css";
import Button from '@material-ui/core/Button';

function Help(props) {

  function closeHelp() {
      props.closeHelpBox();
  }

  return (
    <div className="help">
      <div className="help__info">
        <h3 style={{ color: "#FF0000" }}>How to use</h3>
        <hr />
        <p>
            <br />
            Select a country from the countries dropdown tool to view tracking data from 
            any country. <br /><br />
            Click on any of the 3 Info boxes to switch the displayed data to either
            CASES, RECOVERED or DEATHS<br /><br />
            Both the displayed data, Graphs and Map will change accordingly< br/><br />
            You can zoom the map to zero in on a location.<br /><br />
            Click on the colored Circles on the Map to get more info about each country
        </p>
        <br /><hr />
        <Button className="game-style-butt" onClick={closeHelp}>
            Close
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Help;
