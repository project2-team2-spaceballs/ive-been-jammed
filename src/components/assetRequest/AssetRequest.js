import React from 'react'

class AssetRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 4, //passed userId
      user: {}, //this is the entire user info from the database for the specified user
      satellites: [], //these are all of the available satellites
      userRequests: [], //these are all of the requests specific to the specified user
      messages: [], //so far these are all of the messages for all of the requests not filtered at this point
      newRequest: {}, //this allows setting the params to add a new request
      newMessage: {}
    }
  }
  

  updateUser = async () => {
    fetch(`http://localhost:8080/users/${this.state.userId}`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ user: res });
        })
        .catch((res) => alert(res.message));
  };

  updateRequests = async () => {
    fetch(`http://localhost:8080/asset-request/userId/${this.state.userId}`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ userRequests: res });
        })
        .catch((res) => alert(res.message));
  };

  updateMessages = async () => {
    fetch(`http://localhost:8080/asset-request/message`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ messages: res });
        })
        .catch((res) => alert(res.message));
  };

  async componentDidMount () {//initial state
    this.updateUser();
    var firstName = this.state.user.first_name;
    console.log("userData: "+ firstName);
    this.updateRequests();
    this.updateMessages();
    

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
    };
    this.setState({newRequest: newRequest});

    let newMessage = {
      "user_id": this.state.userId,
      "time_stamp": new Date(),
      "text": "",
      "asset_request_id": 0,
    };
    this.setState({newMessage: newMessage});
  }

  DateSetter = (d) => {//changes a date to DD MMM YYYY string format
    
    let date = d;
    if (date !== "All") {
        date = new Date(date);
        date = `${date.getDate()} ${date.toLocaleString('default', {month: 'short'})} ${date.getFullYear()}`;
    }
    return date;
  }

  TimeSetter = (d) => {//returns the time in HH:MM string format

    let time = new Date(d);
    let addZero = (i) =>{ //used to set zeros in front of a single digit number for dates
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    let hours = addZero(time.getHours());
    let mins = addZero(time.getMinutes());
    return `${hours}:${mins}`;

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
    let newMessageId;
    var request = this.state.newRequest;
    var requestBody = JSON.stringify(request);
    await fetch('http://localhost:8080/asset-request/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },  
      body: requestBody
    })
        .then((res) => res.json())
        .then((res) => {
          newMessageId = parseInt(res);
        })
        .then(this.updateRequests());

    this.setState(previousState => ({
      newMessage: {
        ...previousState.newMessage, 
        asset_request_id: newMessageId
      }
    }));        
    await fetch('http://localhost:8080/asset-request/message/', {
      method: "POST",
      headers :{
        'Content_Type': 'application/json'
      },
      body: JSON.stringify(this.newMessage)
    })
      .then(this.updateMessages());

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

      if (event.target.id === "notes") {
        this.setState(previousState => ({
          newMessage: {
            ...previousState.newMessage, 
            text: event.target.value
          }
        }));
      }

    }
  
      return(
        <table>
          <thead>
            <tr>
              <th>Mission Type</th>
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
                <td> On-Orbit Missile Battery</td>
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

  MyRequestsHeader = () => {//just the header for current user's requests
  
      return(
          <thead>
            <tr>
              <th>Mission Type</th>
              <th>Satellite</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>Stop Date</th>
              <th>Stop Time</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Elevation</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
      )
  }
  
  DisplayMessages = (requestId) => {//Displays the messages for each of the requests
    return this.state.messages.map(message => {
      if (message.asset_request_id === requestId) {
          return <a> {message.text} </a>
      }
    })

  }

  MyRequests = () => {//just the header for current user's requests
    return this.state.userRequests.map(request => {
      return(

              <tr>
                <td> On-Orbit Missile Battery</td>
                <td> 25891 </td>
                <td>{this.DateSetter(request.pass_start)}</td>
                <td>{this.TimeSetter(request.pass_start)}</td>
                <td>{this.DateSetter(request.pass_stop)}</td>
                <td>{this.TimeSetter(request.pass_stop)}</td>
                <td>{request.latitude}</td>
                <td>{request.longitude}</td>
                <td>{request.elevation}</td>
                <td>{request.status}</td>
                <td>{this.DisplayMessages(request.id)}</td>
              </tr>  
            )

    })
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
  


  render () {//builds the main page in react
    return (
      <div>
        <header>Asset Request</header>
        <h2> 
          User : {this.state.user.first_name} {this.state.user.last_name}
        </h2>
        <h2>Add New Request</h2>
        <this.NewRequest />
        <h2>My Requests</h2>
        <table>
          <this.MyRequestsHeader />
          <tbody>
            <this.MyRequests />
          </tbody>
       
        </table>

      </div>
    );
  }
}

export default AssetRequest;