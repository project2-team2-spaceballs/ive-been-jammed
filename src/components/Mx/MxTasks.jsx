import React, { useEffect,useContext } from 'react'
import {MxContext} from './MxProvider'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function MxTasks(){
    const context=useContext(MxContext)
    const classes = useStyles();
    useEffect( ()=>
    context.mxFetch(context.state.sensor))
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>MX_ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Sensors</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {context.state.MxTasks.map((row) => (
                <TableRow key={row.mx_id}>
                  <TableCell component="th" scope="row">
                    {row.mx_id}
                  </TableCell>
                  <TableCell align="right">{row.mx_title}</TableCell>
                  <TableCell align="right">{row.sensors}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.approved}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}