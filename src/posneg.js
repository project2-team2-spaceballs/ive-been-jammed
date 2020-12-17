import React from 'react';
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
        this.setState({currentSatelliteFile: res})
        this.setState({currentPeriod: res[0].period})
        this.setState({currentInclination: res[0].inclination})
        this.setState({currentElset: res[0].elset})
        this.setState({currentRcs: res[0].rcs})
        this.setState({currentMissionType: res[0].mission_type})
        this.setState({currentStatus: res[0].status})
    })
    .catch((res) => alert(res.message))
}

// async handleSatIdSubmit (event) {
//     event.preventDefault()
//     const currentSatIdResponse = await fetch(`http://localhost:8080/satellites/22010`, { headers : { 'Content-Type': 'application/json', 'Accept': 'application/json' }, mode: 'no-cors' })
//     console.log(currentSatIdResponse)
//     const currentSatIdJson = await currentSatIdResponse.json()
//     console.log(currentSatIdJson)
    // this.setState({currentSatelliteFile: currentSatIdJson[0]})
    // this.setState({currentPeriod: currentSatIdJson[0].period})
    // this.setState({currentInclination: currentSatIdJson[0].inclination})
    // this.setState({currentElset: currentSatIdJson[0].elset})
    // this.setState({currentRcs: currentSatIdJson[0].rcs})
    // this.setState({currentMissionType: currentSatIdJson[0].mission_type})
    // this.setState({currentStatus: currentSatIdJson[0].status})

    // const currentSatPassResponse = await fetch(`http://localhost:8080/passes/${this.state.currentSatelliteId}`, { mode: 'no-cors'})
    // // const currentSatPassJson = await currentSatPassResponse.json()
    // this.setState({currentSatelliteAllPasses: currentSatPassJson})

// }



  //RENDER
  render(){
      return(
          <div>
              <h1>Virtual POS/NEG</h1>
              <p>Enter Sat Number</p>
              <input type="text" onChange={this.handleSatIdInput}/>
              <button onClick={this.handleSatIdSubmit.bind(this)}>Get Satellite Info</button>
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