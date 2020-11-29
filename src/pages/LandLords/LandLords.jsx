import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 70,
    padding: theme.spacing(1),
  },
  table: {
    minWidth: "768px",
  },
  tableHeadStyle: {
    fontWeight: 600,
  },
  landlordGenderStyle: {
    textTransform: "capitalize",
  },
}));

function createData(title, firstName, lastName, gender, phone, email) {
  return { title, firstName, lastName, gender, phone, email };
}

const rows = [
  createData(
    "Mr",
    "John",
    "Emeka",
    "male",
    "08101234567",
    "johnemaka@gmail.com"
  ),
  createData(
    "Doctor",
    "Champ",
    "Rhanda",
    "female",
    "08101234567",
    "rhanda@gmail.com"
  ),
  createData("Mr", "John", "Bela", "male", "08101234567", "bela@gmail.com"),
  createData(
    "Mrs",
    "Champlan",
    "Peena",
    "female",
    "08101234567",
    "peena@gmail.com"
  ),
  createData(
    "Mr",
    "Peter",
    "Bart",
    "male",
    "08101234567",
    "peterbart@gmail.com"
  ),
];
function LandLords() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h6" align="left">
          LandLords
        </Typography>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} size={"medium"}>
            <TableHead>
              <TableRow>
                <TableCell component="th" className={classes.tableHeadStyle}>
                  Title
                </TableCell>
                <TableCell
                  component="th"
                  className={classes.tableHeadStyle}
                  variant="head"
                >
                  First Name
                </TableCell>
                <TableCell component="th" className={classes.tableHeadStyle}>
                  Last Name
                </TableCell>
                <TableCell component="th" className={classes.tableHeadStyle}>
                  Gender
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
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={`${index}`}
                    padding="default"
                  >
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell
                      align="left"
                      className={classes.landlordGenderStyle}
                    >
                      {row.gender}
                    </TableCell>
                    <TableCell scope="row">{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default LandLords;
