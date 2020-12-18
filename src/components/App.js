import React from "react";
import Header from "../components/ui/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme";
import Logs from './logs/Logs';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Logs />
        </ThemeProvider>
    );
}

export default App;
