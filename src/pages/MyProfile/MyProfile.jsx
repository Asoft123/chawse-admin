import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import EditIcon from "@material-ui/icons/Edit";
import avatarImg from "../../images/avatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 70,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "900px",
    paddingTop: theme.spacing(5),
  },
  profileContainer: {
    width: "100%",
  },
  avatarGridStyle: {
    alignItems: "center",
    padding: "none",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    background: "#eeeeee",
    width: "100%",
  },
  avatarImgStyle: {
    width: "170px",
    height: "170px",
    objectFit: "cover",
  },
  boxStyle: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderBottom: "1px solid #E9E9E9",
    shadow: theme.shadows[11],
  },
}));

function MyProfile() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={0} className={classes.profileContainer}>
          <Grid
            item
            container
            direction="column"
            xs={12}
            sm={5}
            className={classes.avatarGridStyle}
          >
            <Avatar
              alt="profile"
              src={avatarImg}
              className={classes.avatarImgStyle}
            />
            <br />
            <Button variant="outlined" size="small">
              <EditIcon />
              Edit Profile
            </Button>
            <br />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box className={classes.boxStyle}>
              <Typography
                variant="subtitle2"
                display="inline"
                align="left"
                color="primary"
              >
                First Name:
              </Typography>{" "}
              <Typography variant="body1" align="left">
                Wisdom
              </Typography>
            </Box>
            <Box className={classes.boxStyle}>
              <Typography
                variant="subtitle2"
                display="inline"
                align="left"
                color="primary"
              >
                Last Name:
              </Typography>{" "}
              <Typography variant="body1" align="left">
                Akpomeyoma
              </Typography>
            </Box>
            <Box className={classes.boxStyle}>
              <Typography
                variant="subtitle2"
                display="inline"
                align="left"
                color="primary"
              >
                Email:
              </Typography>{" "}
              <Typography variant="body2" align="left">
                wakpomeyoma@gmail.com
              </Typography>
            </Box>
            <Box className={classes.boxStyle}>
              <Typography
                variant="subtitle2"
                display="inline"
                align="left"
                color="primary"
              >
                Role:
              </Typography>{" "}
              <Typography variant="body2" align="left">
                CTO/Admin
              </Typography>
            </Box>
            <Box className={classes.boxStyle}>
              <Typography
                variant="subtitle2"
                display="inline"
                align="left"
                color="primary"
              >
                Number of Properties Uploaded:
              </Typography>{" "}
              <NumberFormat
                value={400}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <Typography variant="body1">{value}</Typography>
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MyProfile;
