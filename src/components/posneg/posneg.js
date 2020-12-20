import React from 'react';
import SatelliteEntry from './SatelliteEntry'
import ViewPosNeg from './ViewPosNeg'
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
      tempPosNeg:[],
      tempPasses:[],
      posneg: [],
      passes: [],
      //INPUTS
      currentSatelliteId: ''
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
  this.state.tempPosNeg.push(this.state.currentSatelliteFile)
  this.state.tempPasses.push(this.state.currentSatelliteAllPasses)
  this.setState({posneg: this.state.tempPosNeg})
  this.setState({passes: this.state.tempPasses})
}

handleRemoveFromPosNeg = (event) => {
  event.preventDefault()
  var length = this.state.tempPosNeg.length;
  for(var i=0; i < length; i++){
    console.log(this.state.tempPosNeg[i].id)
    if(this.state.tempPosNeg[i].id == this.state.currentSatelliteId){
      this.state.tempPosNeg.splice(i,1)
    }
  }
  this.setState({posneg: this.state.tempPosNeg})
}


  //RENDER
  render(){
      return(
          <div>
              <h1>Virtual POS/NEG</h1>
              <ViewPosNeg 
              posNegArray = {this.state.posneg}
              passesArray = {this.state.passes}
              onPassSubmit = {this.handlePassSubmit}
              
              />
              <h2>Look Up Satellite</h2>
              <input type="text" placeholder="Enter 5 Digit SatNo: XXXXX" onChange={this.handleSatIdInput}/>
              <button onClick={this.handleSatIdSubmit.bind(this)}>Load Satellite & Passes Info</button>
              <SatelliteEntry 
              satFile = {this.state.currentSatelliteFile}
              passesFile = {this.state.currentSatelliteAllPasses}
              onPassSubmit = {this.handlePassSubmit}
              onAddToPosNeg = {this.handleAddToPosNeg}
              onRemoveFromPosNeg = {this.handleRemoveFromPosNeg}
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