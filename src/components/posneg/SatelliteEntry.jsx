import React from 'react';
function SatelliteEntry(props){

    let allPasses = props.passesFile.map(pass => (
        <li>
            Pass: {pass.pass_start} - {pass.pass_stop}
            <br/>
            TOES: {pass.toes}
            <br/>
            Not Keyed Fence: {pass.nk_fence}
            <br/>
            Keyed Fence: {pass.k_fence}
            <br/>
            .
        </li>
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
            
            <h2>Upcoming Passes for Satellite: {props.satFile.id}</h2>
            <button onClick={props.onPassSubmit}>Get Upcoming Passes</button>
            <ul>
               {allPasses} 
            </ul>
            
        </div>
    )
}
export default SatelliteEntry;