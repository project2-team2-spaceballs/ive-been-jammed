import React from 'react'

class AssetRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 2, //passed userId
      user: {}, //this is the entire user into from the database
      satellites: [],
      userRequests: [],
      newRequest: {} //this allows setting the params to add a new flight to the schedule
    }
  }
  

  updateUser = async () => {
    fetch("http://localhost:8080/users/1")
        .then((res) => res.json())
        .then((res) => {
            this.setState({ user: res });
        })
        .catch((res) => alert(res.message));
  };

  updateRequests = async () => {
    fetch("http://localhost:8080/asset-request//userId/1")
        .then((res) => res.json())
        .then((res) => {
            this.setState({ userRequests: res });
        })
        .catch((res) => alert(res.message));
  };

  async componentDidMount () {//initial state
    this.updateUser();
    var firstName = this.state.user.first_name;
    console.log("userData: "+ firstName);
    this.updateRequests();
    

    // var response2 = await fetch('http://localhost:8080/asset-request/userId/'+this.state.userId, { credentials : 'include', mode: 'cors' });
    // // const requestsBody = await response2.json();
    // this.setState({userRequests: response2})

    // var response3 = await fetch('http://localhost:8080/satellites/', { credentials : 'include', mode: 'cors' }) //get the current list of satellites
    // const satellitesBody = await response3.json();
    // this.setState({satellites: satellitesBody});

    let newRequest = {
      "userId": this.state.userId,
      "sat_id": 37,
      "pass_start": new Date(),
      "pass_stop": new Date(),
      "latitude": 0,
      "longitude": 0,
      "elevation": 0,
      "status": "pending"
    }
    this.setState({newRequest: newRequest})
  }

  BuildRequest = async () => {//should be called each time a state change is made
    let url = `http://localhost:8080/asset-request/${this.state.userId}` ;
    var response = await fetch(url);
    const scheduleBody = await response.json();
    this.setState(previousState => (
      {scheduleForDate: scheduleBody}));
    
  }

  DateSetter = (d) => {//changes a date to DD MMM YYYY string format
    
    let date = d;
    if (date !== "All") {
        date = new Date(date);
        date = `${date.getDate()} ${date.toLocaleString('default', {month: 'short'})} ${date.getFullYear()}`;
    }
    return date;
  }
  
  // DateSelector = () => {//used in the header to set the state selected date to view schedule
 
  //   var handleChange = async (event) =>{
  //     await this.setState({selectedDate: event.target.value});
  //     await this.BuildScheduleForDate();
  //   }
  
  //   return (
  //       <select id="dates" onChange={handleChange} > 
  //         {this.state.flightDates.map(date => <option id="date" value={date}> {date} </option> )}
  //       </select>
  //   )
  // }


  SubmitNewRequest = async () => {//sends new request to db and forces refresh of state
    console.log('submitting new request')
    console.log(this.state.newRequest);
    var request = this.state.newRequest;
    var requestBody = JSON.stringify(request);
    await fetch('http://localhost:8080/asset-request/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },  
      body: requestBody
    })
  }

  NewRequest = () => {//full function to set create the params for a new flight on the schedule
 
 
    const handleChange = (event) => {//handles the ongoing changes for each of the inputs for creating new flight
      if (event.target.id === "StartDate") {
        let date = event.target.value;
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10)
        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest,
            pass_start: new Date(year, month-1, day)
          }
        }));
      }

      if (event.target.id === "StartTime") {
        let time = event.target.value;
        let hours = parseInt(time.substring(0, time.indexOf(':')));
        let minutes = parseInt(time.substring(time.indexOf(':')+1, time.indexOf(':')+3));

        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest, 
            pass_start: new Date(previousState.newRequest.pass_start.setHours(hours, minutes))
          }
        }));
      }

      if (event.target.id === "StopDate") {
        let date = event.target.value;
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10)
        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest,
            pass_stop: new Date(year, month-1, day)
          }
        }));
      }

      if (event.target.id === "StopTime") {
        let time = event.target.value;
        let hours = parseInt(time.substring(0, time.indexOf(':')));
        let minutes = parseInt(time.substring(time.indexOf(':')+1, time.indexOf(':')+3));

        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest, 
            pass_stop: new Date(previousState.newRequest.pass_stop.setHours(hours, minutes))
          }
        }));
      }

      if (event.target.id === "latitude") {
        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest, 
            latitude: parseFloat(event.target.value)
          }
        }));
      }

      if (event.target.id === "longitude") {
        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest, 
            longitude: parseFloat(event.target.value)
          }
        }));
      }

      if (event.target.id === "elevation") {
        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest, 
            elevation: parseFloat(event.target.value)
          }
        }));
      }

      if (event.target.id === "tailNumber") {
        this.setState(previousState => ({
          newFlight: {
            ...previousState.newFlight, 
            aircraftId: parseInt(event.target.value)
          }
        }));
      }
      if (event.target.id === "notes") {
        this.setState(previousState => ({
          newFlight: {
            ...previousState.newFlight, 
            aircraftId: parseInt(event.target.value)
          }
        }));
      }

    }
  
      return(
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              {/* <th>Mission Type</th> */}
              <th>Satellite</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>Stop Date</th>
              <th>Stop Time</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Elevation</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
  
              <tr>
                <td> {this.state.userId} </td>
                {/* {/* <td> On-Orbit Missile Battery</td> */}
                {/* <td>
                  <select id="satellites" onChange={handleChange} >
                    {this.state.satellites.map(satellite => <option id="satellite" value={satellite.id}> {satellite.id} </option>)}
                </select>
                </td>  */}
                <td> 25891 </td>
                <td><form onChange={handleChange}><input type="date" id="StartDate" start={new Date()} ></input> </form></td>
                <td><form onChange={handleChange}> <input type="time" id="StartTime" /></form></td>
                <td><form onChange={handleChange}><input type="date" id="StopDate" start={new Date()} ></input> </form></td>
                <td><form onChange={handleChange}> <input type="time" id="StopTime" /></form></td>
                <td><input onChange={handleChange} type="text" id="latitude" required/></td> 
                <td><input onChange={handleChange} type="text" id="longitude" required/></td>     
                <td><input onChange={handleChange} type="text" id="elevation" required/></td> 
                <td><input onChange={handleChange} type="text" id="notes"></input></td>
                <td> <button onClick={this.SubmitNewRequest} value="Add New Request">Add New Request</button>  </td>
            </tr>          
          </tbody>
        </table>
      
      )
  }
  
//   DeleteFlight = async (flight_id) => {//deletes a flight based on the flight_id
//     let url = 'http://localhost:8081/flightschedule/' + flight_id;
//     await fetch(url, {
//       method: "DELETE"
//     })
//     this.BuildScheduleForDate()
 
//   }

//   UpdateFlight = async (updatedFlight) => {
//     console.log('submitting new flight: ' + updatedFlight.callSign + updatedFlight.takeoffTime)
//     // console.log(this.state.newFlight.indexOf(flight_id))
//     await fetch('http://localhost:8081/flightschedule/', {
//       method: "PATCH",
//       headers: {
//         'Content-Type': 'application/json'
//       },  
//       body: JSON.stringify(updatedFlight)
//     }).then(this.BuildScheduleForDate)
//   }
  
//   ShowSchedule = () => { //main table for displaying the flight schedule as defined in the state for a set date or ALL
//     var schedule = this.state.scheduleForDate;
//     var pilots = this.state.pilots;
//     var aircraft = this.state.aircraft;
//     var updatedFlight = {}
      
//     let addZero = (i) =>{ //used to set zeros in front of a single digit number for dates
//       if (i < 10) {
//         i = '0' + i;
//       }
//       return i;
//     }
  
//     schedule.forEach(flight => {//get the type and tailnumber for each flight 
//       aircraft.forEach(plane => {
//         if (flight.aircraft_id === plane.aircraft_id) {
//           flight.aircraft_model = plane.aircraft_model;
//           flight.tail_number = plane.tail_number
//         }
//       })
//       pilots.forEach(pilot => {//get the pilot name for each flight
//         if (flight.pilot_id === pilot.pilot_id) flight.last_name = pilot.last_name
//       })
//     });
    
//     //handle change
//     const handleChange = (event, updatedFlight_id) => {//handles the ongoing changes for each of the inputs for creating new flight
//       updatedFlight.flight_id = updatedFlight_id;
//       console.log('updatedFlight_id passed to handleChange: ' + updatedFlight_id)

//       if (event.target.id === "takeoffDate") {
//         let date = event.target.value;
//         let year = date.substring(0, 4);
//         let month = date.substring(5, 7);
//         let day = date.substring(8, 10)
//         updatedFlight.takeoffTime = new Date(year,month-1, day)
//         console.log("date: " + updatedFlight.takeoffTime)
//       }

//       if (event.target.id === "takeoffTime") {
//         let time = event.target.value;
//         let hours = parseInt(time.substring(0, time.indexOf(':')));
//         let minutes = parseInt(time.substring(time.indexOf(':')+1, time.indexOf(':')+3));
//         updatedFlight.takeoffTime = new Date(updatedFlight.takeoffTime.setHours(hours, minutes))
//        }

//       if (event.target.id === "duration") {
//         updatedFlight.duration = parseFloat(event.target.value)
//       }

//       if (event.target.id === "callsign") {
//         updatedFlight.callSign = event.target.value
//         console.log("callsign: " + updatedFlight.callSign)
//       }

//       if (event.target.id === "pilots") {
//         updatedFlight.pilotId = parseFloat(event.target.value)
//       }

//       if (event.target.id === "tailNumber") {
//         updatedFlight.aircraftId = parseInt(event.target.value)
//       }

//       if (event.target.id === 'update') {
 
//         let tempFlightIndex = this.state.schedule.findIndex(flight => flight.flight_id === updatedFlight_id);
//         let tempFlight = this.state.schedule[tempFlightIndex]
//         console.log('flight index: ' + tempFlightIndex)
//         console.log('flight Id: ' + updatedFlight.flight_id)
//         console.log('tempFlight obj: ' + tempFlight)
//         if (!updatedFlight.aircraftId) {updatedFlight.aircraftId = tempFlight.aircraft_id}
//         console.log("aircraft: " + updatedFlight.aircraftId)
//         if (!updatedFlight.pilotId) {updatedFlight.pilotId = tempFlight.pilot_id}
//         console.log("pilot: " + updatedFlight.pilotId)
//         if (!updatedFlight.takeoffTime) {updatedFlight.takeoffTime = tempFlight.scheduled_takeoff_timestamp}
//         console.log("date: " + updatedFlight.takeoffTime)
//         if (!updatedFlight.duration) {
//           updatedFlight.duration = ((new Date(tempFlight.scheduled_landing_timestamp) - new Date(tempFlight.scheduled_takeoff_timestamp))/(60*60*1000)).toFixed(1);
//         }  
//           // let duration = ((landT - d)/(60*60*1000)).toFixed(1);
//         console.log("duration: " + updatedFlight.duration)
//         if (!updatedFlight.callSign) {updatedFlight.callSign = tempFlight.callSign}
//         console.log("callsign: " + updatedFlight.callSign)


//         this.UpdateFlight(updatedFlight)
//       }
//     }

//     const Success = (props) => {//function for setting the Mission Success
//       if (props.success) {
//         return <td> YES </td>;
//       } else if (new Date(props.landTime) < new Date()){
//         return <td> NO </td>
//       }
//       return <td> TBD </td>;
//     } 
 
//     return schedule.map(flight => {//builds the row for each line in the flight schedule
//       let missionSuccess = false;
//       let d = new Date(flight.scheduled_takeoff_timestamp);
//       let landT = new Date(flight.scheduled_landing_timestamp);
//       if (flight.actual_landing_timestamp) {
//         d = new Date(flight.actual_takeoff_timestamp);
//         landT = new Date(flight.actual_landing_timestamp);
//         missionSuccess = true;
//       }
//       let date = d.getDate();
//       let month = d.toLocaleString('default', {month: 'short'});
//       let year = d.getFullYear();
//       let hours = addZero(d.getHours());
//       let mins = addZero(d.getMinutes());
  
//       let duration = ((landT - d)/(60*60*1000)).toFixed(1);
//       console.log("flight_id prior to render return: " + flight.flight_id)
  
//       return(
//         <tr value ={flight.flight_id}>
//           <td>{date} {month} {year}</td>
//           <td> {hours}:{mins} </td>
//           <td> {duration} h </td>
//           <td><input onChange={(e) => handleChange(e, flight.flight_id)} type="text" id="callsign" placeholder={flight.call_sign}/></td>   
//           {/* <td> {flight.call_sign} </td>      */}
//           <td> {flight.last_name} </td>     
//           <td> {flight.aircraft_model} </td> 
//           <td> {flight.tail_number} </td>
//           <Success success={missionSuccess} landTime={flight.scheduled_landing_timestamp} />
//           <td><button id="update" onClick={(e) => handleChange(e, flight.flight_id)}>Update</button></td>
//           <td><button onClick={() => this.DeleteFlight(flight.flight_id)}>Delete</button></td>
//         </tr>
//       )
//     });
//     }

  render () {//builds the main page in react
    return (
      <div>
        <header>Asset Request</header>
        <h2> 
          User ID: {this.state.userId}
        </h2>
        <h2>Add New Request</h2>
        <this.NewRequest />
      </div>
    );
  }
}

export default AssetRequest;