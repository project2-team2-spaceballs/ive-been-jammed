import React, {useState} from 'react';
import {Select, MenuItem, FormControl, InputLabel, makeStyles, TextField, Grid, Paper} from '@material-ui/core'

const useStyles = makeStyles(theme => ({

    formControl: {
        minWidth: 180
    }

}));

// const statusfields = {
//     id: 0,
//     radar_id: "",
//     mw_status: 4,
//     md_status: "",
//     sda_status: "",
//     details: ""
// }

const Opscap = () => {
    const classes = useStyles();
    const [status, setStatus] = useState("");
    const [mdStatus, setmdStatus] = useState("");
    const [sdaStatus, setsdaStatus] = useState("");
    const [radarId, setradarId] = useState("")

    const handleChange = (event) => setStatus(event.target.value);
    const handleChange1 = (event) => setmdStatus(event.target.value);
    const handleChange2 = (event) => setsdaStatus(event.target.value);
    const handleChange3 = (event) => setradarId(event.target.value);

    const onSubmit = () => {


    }


        
        
    
    
    

    return (
    <div className={classes.root} style={{paddingTop : 100}}>
        <Grid container spacing={3}>
        
        
        <Grid item xs>
        <FormControl className={classes.formControl}>
             <InputLabel>Radar Id</InputLabel>
            <Select onChange={handleChange3}>
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
            <Select onChange={handleChange}>
                <MenuItem value={1}>Red</MenuItem>
                <MenuItem value={2}>Yellow</MenuItem>
                <MenuItem value={3}>Green</MenuItem>
                <MenuItem value={4}>White</MenuItem>
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs>  
        <FormControl className={classes.formControl}>
            <InputLabel>Missle Defense Status</InputLabel>
            <Select onChange={handleChange1}>
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
            <Select onChange={handleChange2}>
                <MenuItem value={1}>Red</MenuItem>
                <MenuItem value={2}>Yellow</MenuItem>
                <MenuItem value={3}>Green</MenuItem>
                <MenuItem value={4}>White</MenuItem>
            </Select>
        </FormControl>
        </Grid>

       
        <TextField
          onChange
          id="filled-full-width"
          label="Update MDA Change"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        

    </Grid>
           

           <h1> Missle Warning value {status} </h1> 
           <h1> Missile defense Value {mdStatus} </h1>
           <h1> SDA Status Value {sdaStatus} </h1>
           <h1> Radar id Value {radarId} </h1>
        </div>
    );
};

export default Opscap;
