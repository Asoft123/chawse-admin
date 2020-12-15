import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import houseTypes from "../../services/houseType";

const useStyles = makeStyles((theme) => ({
  allCategoriesRoot: {
    width: "100%",
    marginTop: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    minWidth: "768px",
  },
  tableHeadStyle: {
    fontWeight: 600,
  },
  addIconStyle: {
    float: "right",
  },
  rentPropertiesHeader: {
    fontWeight: 400,
    marginTop: theme.spacing(2),
  },
}));

function AllCategories() {
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.allCategoriesRoot}>
      <Container>
        <div>
          <IconButton
            color="primary"
            className={classes.addIconStyle}
            onClick={() => setOpenForm(true)}
          >
            <Typography display="inline">New &nbsp;</Typography> <AddIcon />
          </IconButton>
        </div>
        <Typography
          variant="h6"
          align="left"
          className={classes.rentPropertiesHeader}
        >
          Categories of Apartment
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} size={"medium"}>
            <TableHead>
              <TableRow>
                <TableCell component="th" className={classes.tableHeadStyle}>
                  SN
                </TableCell>
                <TableCell
                  component="th"
                  className={classes.tableHeadStyle}
                  variant="head"
                  size="medium"
                >
                  Type of Property
                </TableCell>
                <TableCell
                  component="th"
                  className={classes.tableHeadStyle}
                  variant="head"
                  size="medium"
                >
                  {" "}
                  &nbsp;
                </TableCell>

                <TableCell
                  component="th"
                  className={classes.tableHeadStyle}
                  variant="head"
                  size="medium"
                >
                  {" "}
                  &nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {houseTypes.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell align="left">{index}</TableCell>
                    <TableCell>{row.type}</TableCell>

                    <TableCell>
                      {
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      }
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary">
                        {<DeleteIcon />}
                      </IconButton>
                    </TableCell>
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

export default AllCategories;
