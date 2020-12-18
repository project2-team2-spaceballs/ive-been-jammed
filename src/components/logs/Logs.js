import React from "react";
import NewEntry from "./NewEntry";
import Entries from "./Entries";

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logEntries: [],
            newDetails: "",
            newDateTime: new Date(),
        };
    }

    updateEntries = async () => {
        fetch("http://localhost:8080/logs")
            .then((res) => res.json())
            .then((res) => {
                this.setState({ logEntries: res });
            })
            .catch((error) => alert("database connection issue"));
    };

    componentDidMount = async () => {
        this.updateEntries();
    };

    handleNewEntryOnChangeDetails = (e) => {
        this.setState({ newDetails: e.target.value });
    };
    handleNewEntryOnChangeDateTime = (dateTime) => {
        this.setState({ newDateTime: dateTime });
    };

    handleNewEntrySubmit = async () => {
        const body = {
            sensor_id: 1,
            details: this.state.newDetails,
            entry_dtg: this.state.newDateTime,
        };
        console.log(JSON.stringify(body));
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/logs", options).catch((res) =>
            alert(res.message)
        );
    };

    render() {
        return (
            <div>
                <h2>Logs</h2>
                <NewEntry
                    handleChangeDetails={this.handleNewEntryOnChangeDetails}
                    handleChangeDateTime={this.handleNewEntryOnChangeDateTime}
                    handleSubmit={this.handleNewEntrySubmit}
                    newDetails={this.state.newDetails}
                />
                <Entries logEntries={this.state.logEntries} />
            </div>
        );
    }
}

export default Logs;
