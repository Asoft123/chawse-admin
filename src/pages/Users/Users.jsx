import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { getUsers }  from '../../services/userService'

// function createData(firstName, lastName, phone, email) {
//   return { firstName, lastName, phone, email };
// }



// const rows = [
  // createData("John", "Emeka", "08101234567", "johnemaka@gmail.com"),
  // createData("Champ", "Rhanda", "08101234567", "rhanda@gmail.com"),
  // createData("John", "Bela", "08101234567", "bela@gmail.com"),
  // createData("Champlan", "Peena", "08101234567", "peena@gmail.com"),
  // createData("Peter", "Bart", "08101234567", "peterbart@gmail.com"),
  // createData("John", "Luis", "08101234567", "johnluis@gmail.com"),
  // createData("Kelvin", "Shaw", "08101234567", "shaw@gmail.com"),
  // createData("Leonard", "Amanda", "08101234567", "amanda@gmail.com"),
  // createData("James", "Loisa", "08101234567", "james@gmail.com"),
  // createData("Spader", "Emeka", "08101234567", "spader@gmail.com"),
  // createData("Bina", "Raymond", "08101234567", "ramond@gmail.com"),
  // createData("Leonard", "Elizabeth", "08101234567", "elizabeth@gmail.com"),
  // createData("James", "Favour", "08101234567", "favour@gmail.com"),
  // createData("Prosper", "Menna", "08101234567", "menna@gmail.com"),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  { id: "phone", numeric: false, disablePadding: true, label: "Phone No." },
  { id: "email", numeric: false, disablePadding: true, label: "Email" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 70,
    padding: theme.spacing(1),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  usersTitle: {
    flex: "1 1 100%",
    marginTop: theme.spacing(2),
    marginBotton: theme.spacing(3),
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

export default function Users() {
  const [users, setUsers] = useState([]);
  
  async function fetchUsers(){
    try{
      const users = await getUsers();
      console.log(users)
      setUsers(users.data.user)
    }catch(err){
      console.log(err)
    }
   
  }
  useEffect(() => {
    fetchUsers()
    }, [])
    
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.usersTitle}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Users
      </Typography>
      <br />
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={`${row.firstname}-${row.lastname}`}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.firstname}
                      </TableCell>
                      <TableCell align="left">{row.lastname}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
       {users && <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />} 
      </Paper>
    </div>
  );
}
