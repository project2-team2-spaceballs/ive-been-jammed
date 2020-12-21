import React from 'react';
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

const OpscapTable = ({ rows }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Radar Id</TableCell>
              <TableCell align="right">Missle Waring Status</TableCell>
              <TableCell align="right">Missile Defense Status</TableCell>
              <TableCell align="right">SDA Status</TableCell>
              <TableCell align="right">Update Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.radar_id}
                </TableCell>
                <TableCell align="right">{row.md_stat}</TableCell>
                <TableCell align="right">{row.mw_stat}</TableCell>
                <TableCell align="right">{row.sda_stat}</TableCell>
                <TableCell align="right">{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default OpscapTable;