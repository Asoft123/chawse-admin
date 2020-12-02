import React from "react";
import * as Yup from "yup";
import Files from "react-files";
import { Formik, Form, Field } from "formik";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./addproperty.css";
import nigeriaStates from "../../services/NigeriaStates";
import houseTypes from "../../services/houseType";
import { connect } from "react-redux";
import { setSnackbar } from "../../redux/actions/uiActions";

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      files: [],
    };
    this.filesRef = React.createRef();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onFilesChange = (files) => {
    this.setState({ files }, () => {
      console.log(this.state.files);
    });
  };

  onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  filesRemoveOne = (file) => {
    this.filesRef.current.removeFile(file);
  };

  filesRemoveAll = () => {
    this.filesRef.current.removeFiles();
  };

  handleSubmit = (values) => {
    if (this.state.files.length < 1) {
      return this.props.setSnackbar(
        "Please upload some pictures of the apartment",
        "error"
      );
    }
    this.setState({ isUploading: true });
    const formData = new FormData();

    for (let i = 0; i < this.state.files.length; i++) {
      formData.append("images", this.state.files[i]);
    }

    formData.append("address", values.address);
    formData.append("town", values.town);
    formData.append("price", values.price);
    formData.append("propertyType", values.propertyType);
    formData.append("condition", values.condition);
    values.size && formData.append("size", values.size);
    formData.append("totalNumberOfRooms", values.totalNumberOfRooms);
    formData.append("numberOfBedrooms", values.numberOfBedrooms);
    formData.append("numberOfToilets", values.numberOfToilets);
    formData.append("numberOf ", values.numberOf);
    formData.append("isFurnished", values.isFurnished);
    formData.append("hasParkingSpace", values.hasParkingSpace);
    formData.append("state", values.state);
    formData.append("lga", values.lga);
    formData.append("isHouseFenced", values.isHouseFenced);
    formData.append("isDiningAvailable", values.isDiningAvailable);
    formData.append("isElectricityAvailable", values.isElectricityAvailable);
    formData.append("isWaterAvailable", values.isWaterAvailable);
    formData.append("accessToRoad", values.accessToRoad);
    formData.append("description", values.description);
  };

  render() {
    const initialValues = {
      address: "",
      town: "",
      price: "",
      propertyType: "",
      condition: "",
      size: "",
      totalNumberOfRooms: "",
      numberOfBedrooms: "",
      numberOfBathrooms: "",
      numberOfToilets: "",
      isDiningAvailable: "",
      isElectricityAvailable: "",
      isFurnished: "",
      hasParkingSpace: "",
      state: "",
      lga: "",
      isHouseFenced: "",
      isWaterAvailable: "",
      accessToRoad: "",
      description: "",
    };

    const propertySchema = Yup.object({
      address: Yup.string()
        .max(255, "The address of the apartment must be under 255 characters")
        .required("Please, Enter the address for this apartment"),
      town: Yup.string()
        .max(255, "The town of this apartment must be under 255 characters")
        .required("Please, Enter the town for this apartment"),
      price: Yup.number().required(
        "Please, Enter an amount for this apartment"
      ),
      propertyType: Yup.string().required(
        "Please, Select a type for this apartment"
      ),
      condition: Yup.string(),
      size: Yup.number(),
      totalNumberOfRooms: Yup.number().required("This is a required field"),
      numberOfBedrooms: Yup.number().required("This is a required field"),
      numberOfBathrooms: Yup.number().required("This is a required field"),
      numberOfToilets: Yup.number().required("This is a required field"),
      isFurnished: Yup.string().required("This is a required field"),
      isDiningAvailable: Yup.string().required("This is a required field"),
      isElectricityAvailable: Yup.string().required("This is a required field"),
      hasParkingSpace: Yup.string().required("This is a required field"),
      state: Yup.string().required("Select a state"),
      lga: Yup.string().required("Select a local government area"),
      isHouseFenced: Yup.string().required("This is a required field"),
      isWaterAvailable: Yup.string().required("This is a required field"),
      accessToRoad: Yup.string().required("This is a required field"),
      description: Yup.string().max(5000),
    });

    const findStates = () => {
      let allStates = [
        {
          states: {
            name: "Select",
            id: 0,
            locals: [{ name: "Select", id: 0 }],
          },
        },
        ...nigeriaStates,
      ];
      return allStates.map((item, index) => {
        return (
          <MenuItem value={item.states.name} key={index}>
            {item.states.name}
          </MenuItem>
        );
      });
    };

    const findLGA = (lgaState) => {
      let lgas = [];

      let selectedState;
      if (lgaState) {
        nigeriaStates.map((item) => {
          if (
            lgaState.toLocaleLowerCase() ===
            item.states.name.toLocaleLowerCase()
          ) {
            selectedState = item.states;
          }
          return selectedState;
        });

        selectedState.locals.map((item) => lgas.push(item.name));

        let allLGAs = ["Select", ...lgas];

        return allLGAs.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        });
      }
    };

    let findHouseTypes = () => {
      return houseTypes.map((house) => {
        return (
          <MenuItem value={house.type} key={house.type}>
            {house.type}
          </MenuItem>
        );
      });
    };
    let uploadText = null;

    if (this.state.files.length === 0) {
      uploadText = "Drag and Drop images of the item here or Click to upload ";
    }

    if (this.state.files.length > 0 && this.state.files.length < 4) {
      uploadText = ` You can still upload ${
        5 - this.state.files.length
      } pictures`;
    }

    if (this.state.files.length === 5) {
      uploadText = `The Maximum number of pictures you can upload have been reached`;
    }

    return (
      <div
        style={{
          marginTop: "70px",
          width: "95%",
          maxWidth: "1080px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Paper>
          <Typography variant="h6">Apartment Upload Form</Typography>
          <br />
          <Container>
            <Formik
              initialValues={initialValues}
              validationSchema={propertySchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => {
                this.handleSubmit(values);
              }}
            >
              {({ errors, touched, values, handleBlur, handleChange }) => (
                <Form>
                  <div>
                    <div className="addproperty-files-container">
                      <Files
                        ref={this.filesRef}
                        className="addproperty-files-dropzone"
                        // style={{ minHeight: "80vh", background: "red" }}
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        multiple
                        accepts={["image/*"]}
                        maxFiles={5}
                        maxFileSize={10000000}
                        minFileSize={0}
                        clickable
                      >
                        {<Typography variant="body2">{uploadText}</Typography>}
                      </Files>
                      {this.state.files.length > 0 &&
                      this.state.files.length < 5 ? (
                        <div className="addproperty-files-list">
                          <ul style={{ display: "inline" }}>
                            {this.state.files.map((file) => (
                              <li
                                className="addproperty-files-list-item"
                                key={file.id}
                              >
                                <div className="addproperty-files-list-item-preview">
                                  {file.preview.type === "image" ? (
                                    <img
                                      className="addproperty-files-list-item-preview-image"
                                      alt={file.name}
                                      src={file.preview.url}
                                    />
                                  ) : (
                                    <div className="files-list-item-preview-extension">
                                      {file.extension}
                                    </div>
                                  )}
                                </div>
                                <div className="files-list-item-content">
                                  {/* <div className="files-list-item-content-item files-list-item-content-item-1">
                                  {file.name}
                                </div> */}
                                  <div className="files-list-item-content-item files-list-item-content-item-2">
                                    {file.sizeReadable}
                                  </div>
                                </div>
                                <IconButton color="secondary">
                                  <DeleteIcon
                                    onClick={this.filesRemoveOne.bind(
                                      this,
                                      file
                                    )}
                                  />
                                </IconButton>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errors.address && touched.address}
                          helperText={errors.address}
                          name="address"
                          variant="outlined"
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errors.town && touched.town}
                          helperText={errors.town}
                          name="town"
                          variant="outlined"
                          required
                          fullWidth
                          id="town"
                          label="Town"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>Type of Apartment</InputLabel>
                          <Field
                            name="propertyType"
                            as={Select}
                            error={errors.propertyType && touched.propertyType}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Type of Property"
                            align="left"
                          >
                            {findHouseTypes()}
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errors.price && touched.price}
                          helperText={errors.price}
                          name="price"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          id="price"
                          label="Price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>State</InputLabel>
                          <Field
                            name="state"
                            as={Select}
                            error={errors.state && touched.state}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="State"
                            align="left"
                          >
                            {findStates()}
                          </Field>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>Local Government Area</InputLabel>
                          <Field
                            name="lga"
                            as={Select}
                            error={errors.lga && touched.lga}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Local Government Area"
                            align="left"
                          >
                            {findLGA(values.state)}
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={
                            errors.totalNumberOfRooms &&
                            touched.totalNumberOfRooms
                          }
                          helperText={errors.totalNumberOfRooms}
                          name="totalNumberOfRooms"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          id="totalNumberOfRooms"
                          label="Total Number of Rooms"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={
                            errors.numberOfBedrooms && touched.numberOfBedrooms
                          }
                          helperText={errors.numberOfBedrooms}
                          name="numberOfBedrooms"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          id="numberOfBedrooms"
                          label="Number of Bedrooms"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={
                            errors.numberOfBathrooms &&
                            touched.numberOfBathrooms
                          }
                          helperText={errors.numberOfBathrooms}
                          name="numberOfBathrooms"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          id="numberOfBathrooms"
                          label="Number of Bathrooms"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={
                            errors.numberOfToilets && touched.numberOfToilets
                          }
                          helperText={errors.numberOfToilets}
                          name="numberOfToilets"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          id="numberOfToilets"
                          label="Number of Toilets"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={errors.size && touched.size}
                          helperText={errors.size}
                          name="size"
                          variant="outlined"
                          type="number"
                          required
                          fullWidth
                          id="size"
                          label="Size of Apartment"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          as={TextareaAutosize}
                          error={errors.description && touched.description}
                          helperText={errors.description}
                          name="description"
                          variant="outlined"
                          required
                          fullWidth
                          id="description"
                          label="Description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={
                              errors.isElectricityAvailable &&
                              touched.isElectricityAvailable
                            }
                          >
                            <FormLabel component="legend" align="left">
                              Does this apartment have electricity available?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Electricity?"
                              name="isElectricityAvailable"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes, electricity is available"
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No, electricity is not available"
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={
                              errors.isDiningAvailable &&
                              touched.isDiningAvailable
                            }
                          >
                            <FormLabel component="legend" align="left">
                              Does this apartment have a dinning space?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Parking Space"
                              name="isDiningAvailable"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes, Dining room is available"
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No, Dinning room is not available"
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={
                              errors.hasParkingSpace && touched.hasParkingSpace
                            }
                          >
                            <FormLabel component="legend" align="left">
                              Does this apartment have a parking space?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Parking Space"
                              name="hasParkingSpace"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="Yes, parking space is available"
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No, parking space is not available"
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={errors.isFurnished && touched.isFurnished}
                          >
                            <FormLabel component="legend" align="left">
                              Is this apartment furnished?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Apartment Furnished"
                              name="isFurnished"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value={"Yes, this apartment is furnihed"}
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value={"Yes, partly furnished"}
                                control={<Radio color="primary" />}
                                label="Yes, Semi-Furnished"
                              />
                              <FormControlLabel
                                value={"No, it is not furnished"}
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={
                              errors.isHouseFenced && touched.isHouseFenced
                            }
                          >
                            <FormLabel component="legend" align="left">
                              Is this apartment fenced?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Is this apartment fenced?"
                              name="isHouseFenced"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value={"Yes, this apartment is fenced"}
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No, this apartment is not fenced"
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={
                              errors.isWaterAvailable &&
                              touched.isWaterAvailable
                            }
                          >
                            <FormLabel component="legend" align="left">
                              Is water available?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Is water available?"
                              name="isWaterAvailable"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value={"Yes, water system is available"}
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No, water system available"
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field required as={RadioGroup}>
                          <FormControl
                            component="fieldset"
                            required
                            error={errors.accessToRoad && touched.accessToRoad}
                          >
                            <FormLabel component="legend" align="left">
                              Is it accessible to road?
                            </FormLabel>
                            <RadioGroup
                              aria-label="Is it accessible to road?"
                              name="accessToRoad"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value={"Yes, it is accessible to road"}
                                control={<Radio color="primary" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No, it is not accessible to road"
                                control={<Radio color="primary" />}
                                label="No"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field as={RadioGroup}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend" align="left">
                              What is the condition of this apartment?
                            </FormLabel>
                            <RadioGroup
                              aria-label="What is the condition of this apartment?"
                              name="condition"
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value={"Newly Built"}
                                control={<Radio color="primary" />}
                                label="Newly Built"
                              />
                              <FormControlLabel
                                value="Not too old"
                                control={<Radio color="primary" />}
                                label="Not too old"
                              />
                              <FormControlLabel
                                value="Old apartment"
                                control={<Radio color="primary" />}
                                label="Old apartment"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Field>
                      </Grid>
                    </Grid>
                  </div>
                  <br />
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={this.state.isUploading}
                        color="primary"
                        size="large"
                        align="left"
                        // className={classes.submit}
                      >
                        {this.state.isUploading ? (
                          <>
                            <CircularProgress size={20} /> Submitting{" "}
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
const mapDispatchToProps = {
  setSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);

// export default AddProperty;
