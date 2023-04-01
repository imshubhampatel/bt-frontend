import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./Form.module.css";
import axios from "axios";
import format from "date-format";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import { departmentInfo } from "../../utils/data";
import Loader from "../Loader/Loader";
export default function SignUp() {
  const [Values, setValues] = useState({
    firstName: "shubham",
    lastName: "patel",
    email: "shubhampatel2024@gmail.com",
    enrollmentNumber: "0608CS211065",
    branch: "CS",
    semester: "4 SEM",
    address: "kskd",
    contactNumber: "9389112183",
    date: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date()),
  });

  const navigate = useNavigate()



  const [Loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setValues({ ...Values, branch: event.target.value });
  };
  const handleChange2 = (event) => {
    setValues({ ...Values, semester: event.target.value });
  };
  // form error handler

  const [isChecked, setIsChecked] = useState(false);
  const [FormValidation, setFormValidation] = useState({
    firstName: false,
    lastName: false,
    email: false,
    enrollmentNumber: false,
    branch: false,
    semester: false,
    address: false,
    contactNumber: false,
  });

  const validate = () => {
    let value = true;

    let logErrors = {
      firstName: false,
      lastName: false,
      email: false,
      enrollmentNumber: false,
      branch: false,
      semester: false,
      address: false,
      contactNumber: false,
    };

    if (Values.firstName == "") {
      value = false;
      logErrors.firstName = "Please enter first name";
    }
    if (Values.lastName == "") {
      value = false;
      logErrors.lastName = "Please enter last name";
    }
    if (
      !(
        Values.email.length > 10 &&
        (Values.email.includes("@gmail.com") ||
          Values.email.includes("@yahoo.com"))
      )
    ) {
      value = false;
      logErrors.email = "Enter valid email";
    }
    if (Values.email == "") {
      value = false;
      logErrors.email = "Please enter email";
    }

    if (
      !(
        Values.enrollmentNumber.includes("0608") &&
        Values.enrollmentNumber.length > 10 &&
        (Values.enrollmentNumber.includes("CS") ||
          Values.enrollmentNumber.includes("ME") ||
          Values.enrollmentNumber.includes("EX") ||
          Values.enrollmentNumber.includes("EC") ||
          Values.enrollmentNumber.includes("CE"))
      )
    ) {
      if (Values.branch !== "MBA") {
        value = false;
        logErrors.enrollmentNumber = "Please enter valid Enroll. number";
      }
    }
    if (Values.enrollmentNumber == "" && Values.branch !== "MBA") {
      value = false;
      logErrors.enrollmentNumber = "Please enter enrollment number";
    }
    if (Values.enrollmentNumber == "") {
      value = false;
      logErrors.enrollmentNumber = "Please enter enrollment number";
    }
    if (Values.branch == "") {
      value = false;
      logErrors.branch = "Please enter branch";
    }
    if (Values.semester == "") {
      value = false;
      logErrors.semester = "Please enter semester";
    }
    if (Values.contactNumber == "") {
      value = false;
      logErrors.contactNumber = "Please enter Phone";
    }
    if (Values.contactNumber.length < 10 || Values.contactNumber.length > 10) {
      value = false;
      logErrors.contactNumber = "Please enter valid Phone";
    }
    if (Values.address == "") {
      value = false;
      logErrors.address = "Please enter address";
    }

    setFormValidation(logErrors);
    return value;
  };

  // form submition handler
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("called")

    if (validate() && isChecked) {
      console.log("called")
      setLoading(true);
      const config = {
        method: "post",
        url: `https://btirthorizon.in/api/user/add-user`,
        data: Values,
      };

      try {
        const result = await axios(config);
        console.log({ result })
        let { uniqueCode, enrollmentNumber, _id } = result.data.data;

        navigate(`/${_id}/${enrollmentNumber}/${uniqueCode}/make-payment`)
        setLoading(false);
        debugger;
      } catch (error) {
        alert(JSON.stringify(error.response.data.message));
        setLoading(false);
        console.log({ error: error.response.data })
        debugger;
      }
    }
  };

  const changeHandler = (name) => (e) => {
    setValues({ ...Values, [name]: e.target.value });
  };
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.Parent_Form}></div>
          <div className={`${styles.Form}`}>
            <React.Fragment>
              <div className={`${styles.heading_form}`}>
                <h3>BTIRT HORIZON : TECHFEST REGISTRATION PORTAL</h3>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    onChange={changeHandler("firstName")}
                    error={FormValidation.firstName && true}
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={Values.firstName}
                  />
                  {/* {FormValidation.firstName && (
                    <p>{FormValidation.firstName}</p>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={Values.lastName}
                    error={FormValidation.lastName && true}
                    onChange={changeHandler("lastName")}
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                  />
                  {/* {FormValidation.lastName && <p>{FormValidation.lastName}</p>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Email"
                    name="Email"
                    label="Email"
                    error={FormValidation.email && true}
                    onChange={changeHandler("email")}
                    fullWidth
                    value={Values.email
                    }
                    autoComplete="email"
                    variant="standard"
                  />
                  {/* {FormValidation.email && <p>{FormValidation.email}</p>} */}
                </Grid>
                <Grid item sx={12} sm={6}>
                  <FormControl variant="standard" sx={{ minWidth: 373 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      {FormValidation.branch ? (
                        <span style={{ color: "#d32f2f" }}>
                          Select Branch *
                        </span>
                      ) : (
                        <span>Select Branch *</span>
                      )}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={Values.branch}
                      onChange={handleChange}
                      label="Age"
                      error={FormValidation.branch}
                    >
                      {departmentInfo.branch.map((item, index) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {/* {FormValidation.branch && <p>{FormValidation.branch}</p>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="enrollment"
                    error={FormValidation.enrollmentNumber}
                    name="enrollment"
                    label="Enrollment Number"
                    onChange={changeHandler("enrollmentNumber")}
                    fullWidth
                    autoComplete="enrollment"
                    value={Values.enrollmentNumber}
                    variant="standard"
                  />
                  {/* {FormValidation.enrollmentNumber && (
                    <p>{FormValidation.enrollmentNumber}</p>
                  )} */}
                </Grid>

                <Grid item sx={12} sm={6}>
                  <FormControl
                    id="form_select"
                    variant="standard"
                    sx={{ minWidth: 373 }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      {FormValidation.semester ? (
                        <span style={{ color: "#d32f2f" }}>
                          Select Semester *
                        </span>
                      ) : (
                        <span>Select Semester *</span>
                      )}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Values.semester}
                      label="semester"
                      variant="standard"
                      onChange={handleChange2}
                      error={FormValidation.semester}
                    >
                      {departmentInfo.semster.map((item, index) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {/* {FormValidation.semester && <p>{FormValidation.semester}</p>} */}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    error={FormValidation.address && true}
                    id="State"
                    name="State"
                    label="Address"
                    onChange={changeHandler("address")}
                    fullWidth
                    autoComplete="State"
                    variant="standard"
                    value={Values.address
                    }
                  />
                  {/* {FormValidation.address && <p>{FormValidation.address}</p>} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    error={FormValidation.contactNumber && true}
                    id="contactNumber"
                    type={"number"}
                    name="contactNumber"
                    label="Phone"
                    onChange={changeHandler("contactNumber")}
                    fullWidth
                    autoComplete="State"
                    value={Values.contactNumber}
                    variant="standard"
                  />
                  {/* {FormValidation.contactNumber && (
                    <p>{FormValidation.contactNumber}</p>
                  )} */}
                </Grid>

              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      onChange={(e) => setIsChecked((prev) => !isChecked)}
                      name="saveAddress"
                      value={isChecked}
                    />
                  }
                  label="I agree with terms and conditions."
                  required
                />
              </Grid>
              {isChecked ? (
                <div className={`${styles.button_submit}`}>
                  <Button
                    variant="contained"
                    style={{ background: "#e52b50" }}
                    onClick={(e) => submitHandler(e)}
                    error={true}
                  >
                    Pay 100 Rupees
                  </Button>
                </div>
              ) : (
                <div className={`${styles.button_submit}`}>
                  <Button
                    variant="contained"
                    style={{ background: "#ddd" }}
                    onClick={(e) => submitHandler(e)}
                    disabled="true"
                  >
                    Pay 100 Rupees
                  </Button>
                </div>
              )}
            </React.Fragment>
          </div>
        </>
      )}
    </>
  );
}
