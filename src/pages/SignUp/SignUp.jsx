import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CopyRight from "../../components/CopyRight/CopyRight";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signingInUser,
  finishSigningInUser,
} from "../../redux/actions/userActions";
import { apiEndPoint } from "../../services/api";
import { setSnackbar } from "../../redux/actions/uiActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};
let SignUpSchema = yup.object().shape({
  firstName: yup.string().max(50).required("First Name is required"),
  lastName: yup.string().max(50).required("Last Name is required"),
  phone: yup.number().required("Phone number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required(),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.userData);

  const handleSubmit = (data) => {
    dispatch(signingInUser());
    setTimeout(() => {
      axios
        .post(`${apiEndPoint}/users/`, data)
        .then((res) => {
          if (res.status === 200) {
            dispatch(finishSigningInUser());
            dispatch(setSnackbar("Registration Successfull", "success"));
            history.replace("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data) {
            dispatch(finishSigningInUser());
            dispatch(setSnackbar(err.response.data.msg, "error"));
          }
        });
    }, 7000);
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <br />
        <Formik
          className={classes.form}
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    helperText={errors.firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    error={errors.lastName && touched.lastName}
                    helperText={errors.lastName}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.phone && touched.phone}
                    helperText={errors.phone}
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                  <TextField
                    error={errors.email && touched.email}
                    helperText={errors.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={userData.isSignUp}
                color="primary"
                className={classes.submit}
              >
                {userData.isSignUp ? (
                  <>
                    <CircularProgress size={20} /> Submitting{" "}
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <CopyRight />
      </Box>
    </Container>
  );
}
