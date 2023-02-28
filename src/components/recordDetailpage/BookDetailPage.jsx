import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

const upsertURL = `${process.env.REACT_APP_SERVER_URL}/upsertBookData`;

const BookDetailPage = ({ item }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)
  // notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  useEffect(() => {
    console.log('passed record', location.state.record.item);

    setPassedRecord(location.state.record.item);
    setshowNew(!location.state.record.item)
  }, [])

  const initialValues = {
    BookName: '',
    Author: '',
    Quantity: '',
    category: '',
    bookIdNo: '',
    imageURL:'',
  }

  const savedValues = {
    BookName: passedRecord?.BookName ?? "",
    Author: passedRecord?.Author ?? "",
    Quantity: passedRecord?.Quantity ?? "",
    category: passedRecord?.category ?? "",
    bookIdNo: passedRecord?.bookIdNo ?? "",
    _id: passedRecord?._id ?? "",
    imageURL:passedRecord?.img??"",
  }


  const validationSchema = Yup.object({
    BookName: Yup
      .string()
      .required('Required')
      .max(30, 'Author must be less than 30 characters'),
  })

  const formSubmission = (values) => {

    console.log('form submission value', values);

    axios.post(upsertURL, values)
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
          showNew ? <h3>New Book</h3> : <h3>Book Detail Page </h3>
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
                  <Box
                    display="flex"
                    width={500} height={500}
                    bgcolor="aliceblue"
                  >
                    <Box m="auto">
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="BookName">BookName  <span className="text-danger">*</span></FormLabel>
                            <Field name="BookName" type="text" class="form-input" />
                            <div style={{ color: 'red' }}>
                              <ErrorMessage name="BookName" />
                            </div>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="Author">Author </FormLabel>
                            <Field name="Author" type="text" class="form-input" />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="Quantity">Quantity </FormLabel>
                            <Field name="Quantity" type="number" class="form-input" />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="bookIdNo">bookIdNo</FormLabel>
                            <Field class="form-input" type="text" name="bookIdNo" />
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="category">category</FormLabel>
                            <Field name="category" as='select' class='form-input'>
                              <option value=""><em>None</em></option>
                              <option value="Economics">Economics</option>
                              <option value="Arts">Arts</option>
                              <option value="Crime">Crime</option>
                              <option value="History">History</option>
                              <option value="Personal Development">Personal Developmen</option>
                            </Field>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="imageURL">Image URL </FormLabel>
                            <Field name="imageURL" type="text" class="form-input" />
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
export default BookDetailPage;

