import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "768px",
  },
  tableHeadStyle: {
    fontWeight: 600,
  },
}));

function createData(firstName, lastName, phone, email) {
  return { firstName, lastName, phone, email };
}

const rows = [
  createData("John", "Emeka", "08101234567", "johnemaka@gmail.com"),
  createData("Champ", "Rhanda", "08101234567", "rhanda@gmail.com"),
  createData("John", "Bela", "08101234567", "bela@gmail.com"),
  createData("Champlan", "Peena", "08101234567", "peena@gmail.com"),
  createData("Peter", "Bart", "08101234567", "peterbart@gmail.com"),
];
function RecentUsers() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" align="left">
        Recent Users
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell
                component="th"
                className={classes.tableHeadStyle}
                variant="head"
                size="medium"
              >
                First Name
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Last Name
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Phone
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={`${row.firstName}-${index}`}>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell id={row.address} scope="row" padding="none">
                    {row.phone}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentUsers;
