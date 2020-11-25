import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import houseImage from "../../images/img.jpeg";
function createData(name, address, price) {
  return { name, address, price, houseImage, DeleteIcon };
}

const rows = [
  createData("John", "Emeka", "446000"),
  createData("Champ", "Rhanda", "446000"),
  createData("John", "Bela", "446000"),
  createData("Champlan", "Peena", "446000"),
  createData("Peter", "Bart", "446000"),
  createData("John", "Luis", "446000"),
  createData("Kelvin", "Shaw", "446000"),
  createData("Leonard", "Amanda", "446000"),
  createData("James", "Loisa", "446000"),
  createData("Spader", "Emeka", "446000"),
  createData("Bina", "Raymond", "446000"),
  createData("Prosper", "Menna", "446000"),
];

const headCells = [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "Image",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
  { id: "Address", numeric: false, disablePadding: true, label: "Address" },
  { id: "Price", numeric: true, disablePadding: true, label: "Price" },
  { id: "Action", numeric: false, disablePadding: true, label: "Action" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 70,
    padding: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    marginTop: theme.spacing(2),
    marginBotton: theme.spacing(3),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  houseImageStyle: {
    width: "30px",
    marging: "0 auto",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Sale() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Properties For Sale
        </Typography>
        <br />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} rowCount={rows.length} />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell align="left">
                        <Link to={`/rent/${row.name}`}>{row.name}</Link>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <img
                          src={row.houseImage}
                          alt="house"
                          className={classes.houseImageStyle}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={row.address}
                        scope="row"
                        padding="none"
                      >
                        {row.address}
                      </TableCell>
                      <TableCell align="left">
                        <NumberFormat
                          value={row.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <p>&#8358;{value}</p>}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <IconButton color="secondary">
                          {<DeleteIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
