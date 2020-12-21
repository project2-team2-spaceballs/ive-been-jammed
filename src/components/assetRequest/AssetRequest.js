import React from 'react'

class AssetRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 1, //passed userId
      user: {}, //this is the entire user info from the database for the specified user
      satellites: [], //these are all of the available satellites
      userRequests: [], //these are all of the requests specific to the specified user
      messages: [], //so far these are all of the messages for all of the requests not filtered at this point
      newRequest: {//this allows setting the params to add a new request
        "userId": 1,
        "sat_id": 22010,
        "pass_start": new Date(),
        "pass_stop": new Date(),
        "latitude": 0,
        "longitude": 0,
        "elevation": 0,
        "status": "pending"
      }, 
      newMessage: {
        "user_id": 1,
        "time_stamp": new Date(),
        "text": "",
        "asset_request_id": 0,
      }
    }
  }
  

  updateUser = async () => {
    await fetch(`http://localhost:8080/users/${this.state.userId}`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ user: res });
        })
        .catch((res) => alert(res.message));
  };

  updateRequests = async () => {
    await fetch(`http://localhost:8080/asset-request/userId/${this.state.userId}`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ userRequests: res });
        })
        .catch((res) => alert(res.message));
  };

  updateMessages = async () => {
    await fetch(`http://localhost:8080/asset-request/message`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ messages: res });
        })
        .catch((res) => alert(res.message));
  };

  updateSatellites = async () => {
    await fetch(`http://localhost:8080/satellites`)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ satellites: res });
        })
        .catch((res) => alert(res.message));
  };


  componentDidMount = async () => {//initial state
    await this.updateUser()
          .then(this.updateRequests())
          .then(this.updateMessages())
          .then(this.updateSatellites());
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

  SubmitNewMessage = async (newMessageId) => {
    this.setState(previousState => ({
      newMessage: {
      ...previousState.newMessage, 
      asset_request_id: newMessageId,
      time_stamp: new Date()  
      }
    }));

    let newMessageBody =  JSON.stringify(this.state.newMessage);   
    await fetch('http://localhost:8080/asset-request/message', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: newMessageBody
    }).then((res) => {
        if (res.status === 200) {
          this.updateMessages();
        }
    });

  }

  SubmitNewRequest = async () => {//sends new request to db and forces refresh of state

    var requestBody = JSON.stringify(this.state.newRequest);
    await fetch('http://localhost:8080/asset-request/', {
      method: "POST",
      headers: {
              'Content-Type': 'application/json'
                },  
      body: requestBody
    })
    .then((res) => res.json())
    .then((res) => {
          this.SubmitNewMessage(parseInt(res));
    });

    this.updateRequests();

  }

  DeleteRequest = async (requestId) => {//deletes a flight based on the flight_id
    let url = 'http://localhost:8080/asset-request/' + requestId;
    await fetch(url, {
      method: "DELETE"
    });
    this.updateRequests();
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

      if (event.target.id === "satellites") {
        this.setState(previousState => ({
          newRequest: {
            ...previousState.newRequest, 
            sat_id: parseInt(event.target.value)
          }
        }));

      }

      // if (event.target.id === "missionType") { //for future use
      //   this.setState(previousState => ({
      //     newRequest: {
      //       ...previousState.newRequest, 
      //       missionType: event.target.value
      //     }
      //   }));
      // }

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
              <th>Satellite</th>
              <th>Mission Type</th>
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
                <td>
                    <select id="satellites" onChange={handleChange}> 
                      {this.state.satellites.map(satellite => <option id="satellite" value={satellite.id}> {satellite.id} </option> )}
                    </select>
                </td> 
                <td> {this.DisplayMissionType(this.state.newRequest.sat_id)}</td>
                <td><form onChange={handleChange} placeholder={new Date()}><input type="date" id="StartDate" start={new Date()} ></input> </form></td>
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
  
  DisplayMessages = (requestId) => {//Displays the messages for each of the requests

    return this.state.messages.map(message => {
      if (message.asset_request_id === requestId) {
          return message.text
      }
    })

  }

  DisplayMissionType = (satId) => {

    let missionType;
    this.state.satellites.map(satellite => {
      if (satellite.id === satId) {
        missionType = satellite.missionType;
        return missionType;
      };
    });

    return missionType;
  }

  MyRequestsHeader = () => {//just the header for current user's requests
  
      return(
          <thead>
            <tr>
              <th>Satellite</th>
              <th>Mission Type</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>Stop Date</th>
              <th>Stop Time</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Elevation</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Delete</th>
            </tr>
          </thead>
      )
  }

  MyRequests = () => {//just the header for current user's requests
    return this.state.userRequests.map(request => {

      return(

              <tr>
                <td> {request.sat_id} </td>
                <td> {this.DisplayMissionType(request.sat_id)}</td>
                <td> {this.DateSetter(request.pass_start)}</td>
                <td> {this.TimeSetter(request.pass_start)}</td>
                <td> {this.DateSetter(request.pass_stop)}</td>
                <td> {this.TimeSetter(request.pass_stop)}</td>
                <td> {request.latitude}</td>
                <td> {request.longitude}</td>
                <td> {request.elevation}</td>
                <td> {request.status}</td>
                <td> {this.DisplayMessages(request.id)}</td>
                <td><button onClick={() => this.DeleteRequest(request.id)} >Delete</button></td>
              </tr>  
            )

    })
  }



  render () {//builds the main page in react
    return (
      <div>
        <header>Asset Request</header>
        <h2> 
          Welcome {this.state.user.first_name} {this.state.user.last_name}
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