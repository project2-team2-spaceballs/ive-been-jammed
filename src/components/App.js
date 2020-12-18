import React from "react";
import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/core";
import theme from "./ui/Theme";
import Logs from "./logs/Logs";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Logs />
        </ThemeProvider>
    );
};

export default App;
