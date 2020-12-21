
import React from 'react'
import Header from '../components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import Mx from './Mx/Mx'
import Logs from './logs/Logs'
import AssetRequest from './assetRequest/AssetRequest'
import PosNeg from './posneg/posneg'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Opscap from './opscap/Opscap'
import PosNeg from './posneg/posneg'
import Home from './Home'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
        <Switch>
      <Route exact path='/'><Home/></Route>
      <Route exact path='/mx'><Mx/></Route>
      <Route exact path='/logs'><Logs/></Route>
      <Route exact path='/assetrequest'><AssetRequest/></Route>
      <Route exact path='/opscap'><Opscap/></Route>
      <Route exact path='/posneg'><PosNeg/></Route>
      </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
