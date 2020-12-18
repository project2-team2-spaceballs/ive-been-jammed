import React from 'react';
import SatelliteEntry from './SatelliteEntry'
// import ReactDOM from 'react-dom';
// import App from './components/App';
// import reportWebVitals from './reportWebVitals';

class PosNeg extends React.Component {
  //CONSTRUCTOR
  constructor(props){
    super(props)
    this.state = {
      //ARRAYS
      currentSatelliteFile: [],
      currentSatelliteAllPasses: [],
      currentSatellitePass: [],
      posneg: [],
      //INPUTS
      currentSatelliteId: '',
      //SATELLITE DATA FIELDS
      currentPeriod: '',
      currentInclination: '',
      currentElset: '',
      currentRcs: '',
      currentMissionType: '',
      currentStatus: '',
      //PASS DATA FIELDS
      currentPassId: '',
      currentPassStart: '',
      currentPassStop: '',
      currentPassToes: '',
      currentPassNK: '',
      currentPassK: ''
    }
  }

  //METHODS
handleSatIdInput= (event) =>{
    event.preventDefault()
    this.setState({currentSatelliteId: event.target.value})
}

handleSatIdSubmit = async () => {
    fetch(`http://localhost:8080/satellites/${this.state.currentSatelliteId}`)
    .then((res) => res.json())
    .then((res) => {
      this.setState({currentSatelliteFile: res[0]})
      this.setState({currentPeriod: res[0].period})
      this.setState({currentInclination: res[0].inclination})
      this.setState({currentElset: res[0].elset})
      this.setState({currentRcs: res[0].rcs})
      this.setState({currentMissionType: res[0].mission_type})
      this.setState({currentStatus: res[0].status})
    })
    .catch((error) => alert("Please input a 5 digit Satellite Number"))
}

handlePassSubmit = async () => {
  fetch(`http://localhost:8080/passes/${this.state.currentSatelliteId}`)
  .then((res) => res.json())
  .then((res) => {
      this.setState({currentSatelliteAllPasses: res})
  })
  .catch((error) => alert(`No Upcoming Passes for Object ${this.state.currentSatelliteId}`))
}

handleAddToPosNeg = (event) => {
  event.preventDefault()
  // console.log(this.state.currentSatelliteFile)
  // const tempPosNeg = this.state.posneg.push(this.state.currentSatelliteFile[0])
  // console.log(tempPosNeg)
  // this.setState({posneg: tempPosNeg})
}
/////OH BOY

  //RENDER
  render(){
      return(
          <div>
              <h1>Virtual POS/NEG</h1>
              <p>Enter Sat Number</p>
              <input type="text" onChange={this.handleSatIdInput}/>
              <button onClick={this.handleSatIdSubmit.bind(this)}>Get Satellite Info</button>
              <SatelliteEntry 
              satFile = {this.state.currentSatelliteFile}
              passesFile = {this.state.currentSatelliteAllPasses}
              onPassSubmit = {this.handlePassSubmit}
              onAddToPosNeg = {this.handleAddToPosNeg}
              />
          </div>
      )

  }
}




// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default PosNeg;