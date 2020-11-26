import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RecentUsers from "../RecentUsers/RecentUsers";
import RecentSaleProperties from "../RecentSaleProperties/RecentSaleProperties";
import RecentRentProperties from "../RecentRentProperties/RecentRentProperties";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "70px",
    width: "100%",
    paddingTop: theme.spacing(3),
  },
}));
function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader avatar={<MonetizationOnIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="h6" color="primary">
                  Houses for Rent
                </Typography>
                <Typography variant="body2" align="left">
                  44,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader avatar={<ReceiptIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="h6" color="primary">
                  Houses for Sale
                </Typography>
                <Typography variant="body2" align="left">
                  44,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader avatar={<PeopleAltIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="h6" color="primary">
                  Users
                </Typography>
                <Typography variant="body2" align="left">
                  44,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <RecentUsers />
        <br />
        <RecentSaleProperties />
        <br />
        <RecentRentProperties />
      </Container>
    </div>
  );
}

export default Dashboard;
