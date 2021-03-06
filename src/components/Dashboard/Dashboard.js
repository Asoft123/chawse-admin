import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RecentUsers from "../RecentUsers/RecentUsers";
import RecentSaleProperties from "../RecentSaleProperties/RecentSaleProperties";
import RecentRentProperties from "../RecentRentProperties/RecentRentProperties";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "70px",
    width: "100%",
    paddingTop: theme.spacing(3),
  },
  categoryTextStyle: {
    flexGrow: 1,
  },
}));
function Dashboard() {
  const history = useHistory();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardHeader avatar={<MonetizationOnIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="body1" color="primary">
                  Houses for Rent
                </Typography>
                <Typography variant="h6" align="left">
                  44,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardHeader avatar={<ReceiptIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="body1" color="primary">
                  Houses for Sale
                </Typography>
                <Typography variant="h6" align="left">
                  44,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardHeader avatar={<PeopleAltIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="body1" color="primary">
                  Users
                </Typography>
                <Typography variant="h6" align="left">
                  44,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <CardHeader avatar={<PeopleAltIcon />}></CardHeader>
              <CardContent>
                <Typography align="left" variant="body1" color="primary">
                  Landlords
                </Typography>
                <Typography variant="h6" align="left">
                  4,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <Card>
          <CardContent>
            <Typography display="inline" className={classes.categoryTextStyle}>
              Total number of categories of apartment present 44 &nbsp;{" "}
            </Typography>{" "}
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                history.push("/allcategories");
              }}
            >
              View
            </Button>
          </CardContent>
        </Card>
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
