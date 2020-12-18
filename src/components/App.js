import React from 'react'
import Header from '../components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import Mx from './Mx/Mx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <Mx/>
    </ThemeProvider>
  );
}

export default App;
