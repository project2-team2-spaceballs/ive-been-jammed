import React from 'react';
function ViewPosNeg(props){
    
    let allPosNegObjects = props.posNegArray.map(object => (
        <tr>
            <td>  {object.id}</td>
            <td>  {object.period} min  </td>
            <td>  {object.inclination} deg</td>
            <td>  {object.elset}</td>
            <td>  {object.rcs} sq m</td>
            <td>
                <button onClick={props.onPassSubmit}>View Upcoming Passes</button>
            </td>
        </tr>
      
    ))

    return(
        <div>
            <h2>Pos/Neg</h2>
            <table>
                <tr>
                    <th>SatNo</th>
                    <th>Period</th>
                    <th>Inclination</th>
                    <th>ELSET</th>
                    <th>RCS</th>
                    <th>Upcoming Passes</th>
                </tr>
                {allPosNegObjects}
            </table>
        
        </div>
    )
}
export default ViewPosNeg;