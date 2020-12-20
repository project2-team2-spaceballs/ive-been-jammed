import React from 'react';
function SatelliteEntry(props){

    let allPasses = props.passesFile.map(pass => (
        <tr>
            <td>{pass.satId}</td>
            <td>  {pass.pass_start}  </td>
            <td>  {pass.pass_stop}</td>
            
        </tr>
    ))


    return(
        <div>
            <h2>Satellite {props.satFile.id}:</h2>
            
            <p>Period: {props.satFile.period}</p>
            <p>Inclination: {props.satFile.inclination}</p>            
            <p>ELSET: {props.satFile.elset}</p>          
            <p>RCS: {props.satFile.rcs}</p>          
            <p>Mission: {props.satFile.missionType}</p>
            <button onClick={props.onAddToPosNeg}>Add to Pos/Neg </button>
            <button onClick = {props.onRemoveFromPosNeg}>Remove from Pos/Neg</button>
            <h2>Upcoming Passes for Satellite: {props.satFile.id}</h2>
            <table>
                <tr>
                    <th>SatNo</th>
                    <th>Pass Start</th>
                    <th>Pass Stop</th>
                </tr>
                {allPasses} 
            </table>
    
        </div>
    )
}
export default SatelliteEntry;