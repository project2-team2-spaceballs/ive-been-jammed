import React from 'react'
import Header from '../components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import PosNeg from '../posneg'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <PosNeg />
    </ThemeProvider>
  );
}

export default App;
