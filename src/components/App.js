import React from 'react'
import Header from '../components/ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import CardTest from './ui/CardTest'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <CardTest />
    </ThemeProvider>
  );
}

export default App;
