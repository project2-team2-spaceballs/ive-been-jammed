import React from 'react'
import Header from '../components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import Opscap from './opscap/Opscap'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <Opscap />
    </ThemeProvider>
  );
}

export default App;
