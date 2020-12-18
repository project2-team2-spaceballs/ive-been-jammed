import React, {useState, useEffect} from 'react';
import {Select, MenuItem, FormControl, InputLabel, makeStyles, TextField, Grid, Button} from '@material-ui/core'
import axios from 'axios';

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

const Opscap = () => {
    const classes = useStyles();
    const [status, setStatus] = useState(statusfields);
    const [visibile, setVisible] = useState(true);
   
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
                 details : ""
             }));

    }


        
        
    
    
    

    return (
    <div className={classes.root} style={{paddingTop : 100}}>
        <form > 
        <Grid container spacing={3}>
        
        
        <Grid item xs>
        <FormControl className={classes.formControl}>
             <InputLabel>Radar Id</InputLabel>
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
          label="Update MDA Change"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        /> 

        <Button onClick={handleClick}>
            Click me to update shit
        </Button>
        
        

    </Grid>
    </form>
           

           <h1> Missle Warning value {status.mw_stat} </h1> 
           <h1> Missile defense Value {status.md_stat} </h1>
           <h1> SDA Status Value {status.sda_stat} </h1>
           <h1> Radar id Value {status.radar_id} </h1>
           <h1> details {status.details} </h1>
        </div>
    );
};

export default Opscap;
