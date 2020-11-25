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
import houseImage from "../../images/img.jpeg";
import NumberFormat from "react-number-format";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "768px",
  },
  tableHeadStyle: {
    fontWeight: 600,
  },
  houseRentImageStyle: {
    width: "28px",
    marging: "0 auto",
  },
  rentPropertiesHeader: {
    fontWeight: 400,
    marginTop: theme.spacing(2),
  },
}));

function createData(name, address, price) {
  return { name, address, price, houseImage };
}

const rows = [
  createData("2 bedroom flat", "Kingsway, okaka ", "446000"),
  createData("3 bedroom bungalow", "Kelvin street peace avenue", "446000"),
  createData("Office space", "No. 10 highway road", "446000"),
  createData("Office space", "No. 33 kelvin wisdom avenue, NY", "446000"),
];

function RecentRentProperties() {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="h6"
        align="left"
        className={classes.rentPropertiesHeader}
      >
        Recent Properties for Rent
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
                Type of Property
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Address
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Image
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Price
              </TableCell>
              <TableCell component="th" className={classes.tableHeadStyle}>
                Date Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={`${row.firstName}-${index}`}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <img
                      src={row.houseImage}
                      alt="house"
                      className={classes.houseRentImageStyle}
                    />
                  </TableCell>

                  <TableCell align="left">
                    {" "}
                    <NumberFormat
                      value={row.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <p>&#8358;{value}</p>}
                    />
                  </TableCell>
                  <TableCell>
                    {moment().format("MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentRentProperties;
