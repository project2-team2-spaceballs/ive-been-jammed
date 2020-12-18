import React from "react";
import NewEntry from "./NewEntry";
import Entries from "./Entries";

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logEntries: [],
            logComments: [],
            logHistory: [],
            newDetails: "",
            newDateTime: new Date(),
        };
    }

    updateEntries = async () => {
        fetch("http://localhost:8080/logs/")
            .then((res) => res.json())
            .then((res) => {
                this.setState({ logEntries: res });
            })
            .catch((res) => alert(res.message));
    };

    findComments = async (log_id) => {
        fetch("http://localhost:8080/logs/comments/" + log_id)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ logComments: res });
            })
            .catch((res) => alert(res.message));
    };
    findHistory = async (log_id) => {
        fetch("http://localhost:8080/logs/history/" + log_id)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ logHistory: res });
            })
            .catch((res) => alert(res.message));
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
            entry_dtg: this.state.newDateTime.getTime(),
        };
        console.log(JSON.stringify(body));
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/logs", options)
            .then((res) => {
                if (res.status === 200) {
                    this.updateEntries();
                }
            })
            .catch((res) => alert(res.message));
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
                <Entries
                    logEntries={this.state.logEntries}
                    logComments={this.state.logComments}
                    getComments={this.findComments}
                    logHistory={this.state.logHistory}
                    getHistory={this.findHistory}
                />
            </div>
        );
    }
}

export default Logs;
