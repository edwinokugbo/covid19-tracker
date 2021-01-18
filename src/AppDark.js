import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import "./dark/AppDark.css";
import InfoBox from "./dark/InfoBox.js";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import Button from '@material-ui/core/Button';
import Help from './Help';

function AppDark() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [showHelp, setShowHelp] = useState(false);
  const [showhowto, setShowhowto] = useState(false)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);      

      if (countryCode === "worldwide") {
        setMapCenter({ lat: 34.80746, lng: -40.4796 });
        setMapZoom(3);
      } else {
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        setMapZoom(4);
      }    
    })
  };

  function showHelpBox() {
    setShowhowto(true)
  }

  function closeHelpBox() {
    setShowhowto(false)
  }

  return (
    <div className="app">
      <div className="app__body">
      <div className="app__left">
        <div className="app__header">
          {/* <img src="https://live.medikalhms.com/assets/img/icon.jpg" height="30" alt=""/> */}
          <h1 className="app__title">Medikal COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem key={country.value} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox 
            active={casesType === "cases"}
            boxColor="infoBox--red"
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}
            color="#CC1034"
          />
          <InfoBox 
            active={casesType === "recovered"}
            boxColor="infoBox--green"
            onClick={(e) => setCasesType("recovered")}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)} 
            color="rgb(8, 185, 8)"
          />
          <InfoBox 
            active={casesType === "deaths"}
            boxColor="infoBox--purple"
            onClick={(e) => setCasesType("deaths")}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)} 
            color="rgb(158, 13, 158)"
          />
        </div>  

        <Map 
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} 
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>{casesType.charAt(0).toUpperCase() + casesType.slice(1)} by Country</h3>
          <Table countries={tableData} casesType={casesType} />
          <h3 className="linegraph__header">Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
        <Button onClick={ showHelpBox }>
          Help
        </Button>
        <div id="overlay-howto" style={{display: `${showhowto ? "block": "none"}`}}>
          <Help closeHelpBox={closeHelpBox} />
        </div>
      </Card>
      </div>
    </div>
  );
}

export default AppDark;
