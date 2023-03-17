import React from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Data
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Rather not say", value: "rather_not_say" },
];

const blood = [
  { label: "O+", value: "o_p" },
  { label: "O-", value: "o_n" },
  { label: "A+", value: "a_p" },
  { label: "A-", value: "a_n" },
  { label: "B+", value: "b_p" },
  { label: "B-", value: "b_p" },
];

//password validation
const numericRegEx = /(?=.*[0-9])/;

//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  blood: Yup.string().required("Required"),
  conditions: Yup.string().required("Required"),
  email: Yup.string().email("Enter a valid email address"),
  medication: Yup.string().required("Required"),
  phone: Yup.string().matches(numericRegEx,"Enter valid phone number").required("Required"),
});

const UserForm = () => {
  const classes = useStyle();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={7}>
        <Card className={classes.padding}>
          <CardHeader title="Patient Registration Form"></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          name="firstName"
                          value={values.firstName}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          name="lastName"
                          value={values.lastName}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            name="gender"
                          >
                            {options.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                          <DesktopDatePicker
                          label ="DOB"
                            defaultValue={dayjs("2022-04-17")}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label="Address"
                          variant="outlined"
                          fullWidth
                          name="address"
                          value={values.address}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          name="phone"
                          value={values.phone}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Emergency Contact Number"
                          variant="outlined"
                          fullWidth
                          name="phone"
                          value={values.emergency}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Blood Group
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.blood}
                            name="blood"
                          >
                            {blood.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label="Chronic Medical Conditions"
                          variant="outlined"
                          fullWidth
                          name="conditions"
                          value={values.conditions}
                          component={TextField}
                          helperText="Put (-) if none"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Field
                          label="Long Term Ongoing Medication"
                          variant="outlined"
                          fullWidth
                          name="medication"
                          value={values.medication}
                          component={TextField}
                          helperText="Put (-) if none"
                        />
                      </Grid>
                    </Grid>
                    </LocalizationProvider>
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}
                    >
                      REGISTER
                    </Button>
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserForm;
