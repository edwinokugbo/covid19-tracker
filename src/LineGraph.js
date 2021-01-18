import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import './LineGraph.css';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRation: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

const casesTypeColors = {
    cases: "#d4402c",
    recovered: "#6EB81F",
    deaths: "#825CDF",
};

function LineGraph({ casesType = "cases", color }) {
    const [data, setData] = useState({})

    const buildChartData = (data) => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {        
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response) => response.json())
            .then((data) =>  {
                let chartData = buildChartData(data);           
                setData(chartData);
            })
        } 

        fetchData();
    }, [casesType])

    return (
        <div className="linegraph">
            {data?.length > 0 &&  (
            <Line 
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: `${casesTypeColors[casesType]}`,
                            borderColor: `${casesTypeColors[casesType]}`,
                            data: data,
                        }
                    ]
                }}
            />
            )}
        </div>
    )
}

export default LineGraph