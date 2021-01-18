import React, { useEffect } from 'react';
import numeral from 'numeral';
import './Table.css';
import { prettyPrintStat } from './util';
import styled, { css } from 'styled-components';

function Table({ countries, ...props }) {
    const TableDiv = styled.div`    
    ${props.displayMode &&
    css`
    & > tr {
        color: #ccc;
    }
    & > tr:nth-of-type(odd) {
    background-color: #302f2f;
    color: #c48484;
    }
    `}
    `;

    return (
        <TableDiv className="table">
            {
                countries.map(({ country, cases, recovered, deaths }) => {
                    return <>
                    <tr>
                        <td>{country}</td>
                        { props.casesType === "cases" ? <td>{numeral(cases).format("0,0 ")}</td> : ""}
                        { props.casesType === "recovered" ? <td>{numeral(recovered).format("0,0 ")}</td> : ""}
                        { props.casesType === "deaths" ? <td>{numeral(deaths).format("0,0 ")}</td> : ""}                        
                    </tr>
                    </>
                })
            }            
        </TableDiv>
    )
}

export default Table
