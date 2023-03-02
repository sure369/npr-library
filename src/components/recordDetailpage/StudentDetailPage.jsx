import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

const url = `http://localhost:4500/upsertSudentData`;

const StudentDetailPage = ({ item }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)


  useEffect(() => {
    console.log('StudentDetailPage ', location.state.record.item);

    setPassedRecord(location.state.record.item);
    setshowNew(!location.state.record.item)

    // setPassedRecord(location.state.record);
    // console.log('true', !location.state.record.item);
    // setshowNew(!location.state.record.item)
  }, [])

  const initialValues = {
    FirstName: '',
    LastName: '',
    Department: '',
    Year: '',
    StudentRollNo: '',
  }

  const savedValues = {
    FirstName: passedRecord?.FirstName ?? "",
    LastName: passedRecord?.LastName ?? "",
    Department: passedRecord?.Department ?? "",
    Year: passedRecord?.Year ?? "",
    StudentRollNo: passedRecord?.StudentRollNo ?? "",
    _id: passedRecord?._id ?? "",
  }


  const validationSchema = Yup.object({
    FirstName: Yup
      .string()
      .required('Required')
      .max(30, 'lastName must be less than 30 characters'),
  })

  const formSubmission = (values) => {

    console.log('form submission value', values);

    axios.post(url, values)
      .then((res) => {
        console.log('upsert record  response', res);
       
        setTimeout(() => {
          navigate(-1);
        }, 2000)
      })
      .catch((error) => {
        console.log('upsert record  error', error);
       
      })
  }

  const handleFormClose = () => {
    navigate(-1)
  }
  return (

    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        {
          showNew ? <h3>New Student</h3> : <h3>Student Detail Page </h3>
        }
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={showNew ? initialValues : savedValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              dirty,
              isSubmitting,
              handleChange,
              handleSubmit,
              handleReset,
              setFieldValue,
              errors,
              touched,
            } = props;

            return (
              <>
                <div className='form_center_box'>
                    <Box m="auto">
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="FirstName">FirstName  <span className="text-danger">*</span></FormLabel>
                            <Field name="FirstName" type="text" class="form-input" />
                            <div style={{ color: 'red' }}>
                              <ErrorMessage name="FirstName" />
                            </div>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="LastName">LastName </FormLabel>
                            <Field name="LastName" type="text" class="form-input" />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="Department">Department </FormLabel>
                            <Field name="Department" type="text" class="form-input" />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="StudentRollNo">StudentRollNo</FormLabel>
                            <Field class="form-input" type="text" name="StudentRollNo" />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="Year">Year</FormLabel>
                            <Field name="Year" as='select' class='form-input'>
                              <option value=""><em>None</em></option>
                              <option value="2020">2020-2023</option>
                              <option value="2021">2021-2024</option>
                              <option value="2022">2022-2025</option>
                            </Field>
                          </Grid>
                        </Grid>
                        <div className='action-buttons'>
                          <DialogActions sx={{ justifyContent: "space-between" }}>
                            {
                              showNew ?
                                <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Save</Button>
                                :
                                <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Update</Button>
                            }
                            <Button type="reset" variant="contained" onClick={handleFormClose}  >Cancel</Button>
                          </DialogActions>
                        </div>
                      </Form>
                    </Box>
                </div>
              </>
            )
          }}
        </Formik>
      </div>
    </Grid>
  )
}
export default StudentDetailPage;

