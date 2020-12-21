import React, {useState, useEffect} from 'react';
import {Select, MenuItem, FormControl, InputLabel, makeStyles, TextField, Grid, Button} from '@material-ui/core'
import axios from 'axios';
import OpscapTable from './OpscapTable'
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({

    formControl: {
        minWidth: 180
    }

}));

const statusfields = {
    radar_id: "",
    mw_stat: "",
    md_stat: "",
    sda_stat: "",
    details: ""
}

const statusfields2 = [{
    radar_id: 4,
    mw_stat: 2,
    md_stat: 3,
    sda_stat: 4,
    details: "some Shit"
}]

const Opscap = () => {
    const classes = useStyles();
    const [status, setStatus] = useState(statusfields);
    const [statusArray, setStatusArray] = useState("");
    const [q, setQ] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/opscap")
            .then(response => {
                setStatusArray(response.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])
   
    const handleChange = (event) => setStatus(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value

    }));

    const handleClick = () => {
        
        
        console.log("This shit worked")
        console.log(status);
        axios.post("http://localhost:8080/opscap", status)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

             setStatus(prevState => ( {
                 ...prevState,
                 details : "",
             }));
        
            
             setStatusArray([...statusArray, status])

    }

    

    const radarFilter = statusArray.filter(val => val.radar_id.toString().includes(q))


        
        
    
    
    

    return (
    <div className={classes.root} style={{paddingTop : 100}}>
        <form > 
        <Grid container spacing={3}>
        
        
        <Grid item xs>
        <FormControl className={classes.formControl}>
             <InputLabel >Radar Id</InputLabel>
            <Select onChange={handleChange} name="radar_id">
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs>   
         <FormControl className={classes.formControl}>
             <InputLabel>Missle Warning Status</InputLabel>
            <Select onChange={handleChange} name="mw_stat">
                <MenuItem style={{backgroundColor:'red'}}value={1}>Red</MenuItem>
                <MenuItem value={2}>Yellow</MenuItem>
                <MenuItem value={3}>Green</MenuItem>
                <MenuItem value={4}>White</MenuItem>
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs>  
        <FormControl className={classes.formControl}>
            <InputLabel>Missle Defense Status</InputLabel>
            <Select onChange={handleChange} name="md_stat">
                <MenuItem value={1}>Red</MenuItem>
                <MenuItem value={2}>Yellow</MenuItem>
                <MenuItem value={3}>Green</MenuItem>
                <MenuItem value={4}>White</MenuItem>
            </Select>
        </FormControl>
        </Grid>  

        <Grid item xs>  
        <FormControl className={classes.formControl}>
            <InputLabel>SDA Status</InputLabel>
            <Select onChange={handleChange} name="sda_stat">
                <MenuItem value={1}>Red</MenuItem>
                <MenuItem value={2}>Yellow</MenuItem>
                <MenuItem value={3}>Green</MenuItem>
                <MenuItem value={4}>White</MenuItem>
            </Select>
        </FormControl>
        </Grid>

             
        <TextField
          onChange={handleChange}
          name="details"
          value={status.details}
          id="filled-full-width"
          label="Reason for OpsCap Change"
          style={{ margin: 20}}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        /> 
        
        <Grid item xs container
  direction="row"
  justify="space-evenly"
  alignItems="center">
        <Button  onClick={handleClick} variant="outlined">
            Update OpsCap Status
        </Button>

        </Grid>
        
        

    </Grid>
    </form>

    <h1> Current OPSCAP Status </h1> 

          

              

           
    <TextField
          label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          id="filled-margin-none"
          defaultValue=""
          className={classes.textField}
          helperText="Input Radar ID"
          variant="filled"
        />
           
    <OpscapTable rows={radarFilter} />
    </div> 
    );
    
};

export default Opscap;
