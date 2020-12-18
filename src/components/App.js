
import React from 'react'
import Header from '../components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import Mx from './Mx/Mx'
import Logs from './logs/Logs'
import AssetRequest from './assetRequest/AssetRequest'
import {Route,Switch, BrowserRouter} from 'react-router-dom'
import Opscap from './opscap/Opscap'
import PosNeg from './posneg/posneg'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header/>
        <Switch>
      <Route path='/mx'><Mx/></Route>
      <Route path='/logs'><Logs/></Route>
      <Route path='/assetrequest'><AssetRequest/></Route>
      <Route path='/opscap'><Opscap/></Route>
      <Route path='/posneg'><PosNeg/></Route>
      </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
