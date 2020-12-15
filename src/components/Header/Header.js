import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  FaAtlas,
  FaHome,
  FaMoneyBillWave,
  FaPeopleCarry,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import { IoIosAddCircle, IoIosCash } from "react-icons/io";
import { NavLink, useHistory } from "react-router-dom";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#233446",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0),
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  active: {
    backgroundImage: "linear-gradient(45deg, #0068c2, #0068c2, #234b63)",
    backgroundColor: "#0068c2",
    boxShadow:
      "4px 4px 10px 0 rgba(0,0,0,.1),4px 4px 15px -5px rgba(21,114,232,.4)",
    color: "#ffffff",
  },
  linkIconStyle: {
    fontSize: "16px",
    color: "#aac6d8",
  },
  listItemStyle: {
    // marginTop: "8px",
    paddingLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  nested: {
    paddingLeft: theme.spacing(2),
    background: "#dbdada",
    marginBottom: theme.spacing(0.1),
  },
  nestedLink: {
    fontSize: "12px",
    paddingLeft: theme.spacing(6),
  },
  linkStyle: {
    // color: "#aaaaaa",
    display: "block",
    textDecoration: "none",
    textDecorationStyle: "none",

    "&::hover": {
      textDecoration: "none",
      color: "#eee",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState("");

  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCloseColapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  const handleProfileRoute = () => {
    handleClose();
    history.push("/myprofile");
  };

  const handleRouteChange = (url) => {
    setCollapseOpen(!collapseOpen);
    history.push(`/${url}`);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" noWrap>
              c-Hawse Admin
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={menuOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfileRoute}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <NavLink
          to="/"
          exact
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("dashboard")}
        >
          <ListItem button key="Dashoard" className={classes.listItemStyle}>
            <ListItemIcon>
              <FaHome
                className={active === "dashboard" ? classes.linkIconStyle : ""}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <Divider />
        <ListItem
          button
          onClick={handleCloseColapse}
          className={classes.listItemStyle}
        >
          <ListItemIcon>
            <FaMoneyBillWave className={classes.linkIconStyle} />
          </ListItemIcon>
          <ListItemText primary="Finance" />
          {collapseOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              onClick={() => handleRouteChange("newrecord")}
              button
              className={classes.nested}
            >
              <ListItemText
                primary="New Record"
                className={classes.nestedLink}
              />
            </ListItem>
            <ListItem
              onClick={() => handleRouteChange("allrecords")}
              button
              className={classes.nested}
            >
              <ListItemText
                primary="See Records"
                className={classes.nestedLink}
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <NavLink
          to="/rent"
          exact
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("rent")}
        >
          <ListItem button key="Rent" className={classes.listItemStyle}>
            <ListItemIcon>
              <FaWarehouse
                className={active === "rent" ? classes.linkIconStyle : ""}
              />
            </ListItemIcon>
            <ListItemText primary="Rent" />
          </ListItem>
        </NavLink>

        <Divider />
        <NavLink
          to="sale"
          exact
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("sale")}
        >
          <ListItem button key="Sale" className={classes.listItemStyle}>
            <ListItemIcon>
              <IoIosCash
                className={active === "sale" ? classes.linkIconStyle : ""}
              />
            </ListItemIcon>
            <ListItemText primary="Sale" />
          </ListItem>
        </NavLink>

        <Divider />
        <NavLink
          exact
          to="/users"
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("users")}
        >
          <ListItem button key="User" className={classes.listItemStyle}>
            <ListItemIcon>
              <FaUsers
                className={active === "users" ? classes.linkIconStyle : " "}
              />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          to="/landlords"
          exact
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("landlords")}
        >
          <ListItem button key="landlords" className={classes.listItemStyle}>
            <ListItemIcon>
              <FaPeopleCarry
                className={active === "landlords" ? classes.linkIconStyle : ""}
              />
            </ListItemIcon>
            <ListItemText primary="View LandLords" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          to="/chawseproperties"
          exact
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("chawseproperties")}
        >
          <ListItem
            button
            key="chawseproperties"
            className={classes.listItemStyle}
          >
            <ListItemIcon>
              <FaAtlas
                className={active === "landlords" ? classes.linkIconStyle : ""}
              />
            </ListItemIcon>
            <ListItemText primary="CHawse Properties" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink
          exact
          to="/addproperty"
          className={classes.linkStyle}
          activeClassName={classes.active}
          onClick={() => setActive("addproperty")}
        >
          <ListItem button key="Add Property" className={classes.listItemStyle}>
            <ListItemIcon>
              <IoIosAddCircle
                className={
                  active === "addproperty" ? classes.linkIconStyle : ""
                }
              />
            </ListItemIcon>
            <ListItemText primary="Add Property" />
          </ListItem>
        </NavLink>
      </Drawer>
      {props.children}
    </div>
  );
}
