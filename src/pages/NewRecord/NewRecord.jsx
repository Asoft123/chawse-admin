import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "70px",
  },
}));
function NewRecord() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h6">New Financial Record Form</Typography>
        <Typography variant="subtitle2" align="center">
          To be filled to keep track of cash transactions which cannot be
          tracked by paystack
        </Typography>
        <br />
      </Container>
    </div>
  );
}

export default NewRecord;
