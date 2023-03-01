import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, Forminput, DialogActions, MenuItem,Autocomplete ,TextField} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'




const url = `http://localhost:4500/`;
const fetchInventoriesbyName ='http://localhost:4500/lookupStudent'

const ModalStudentLoockup = ({ item,handleModal }) => {

    const [parentRecord, setParentRecord] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const[studentRecord,setStudentRecord]=useState([])
   
    useEffect(() => {
        console.log('passed record',item);
        // setParentRecord(location.state.record.item);     
        fetchStudentRecord() 
    }, [])

    const initialValues = {
      studentRecorId:'',
      StudnetRollNo:'',
      relatedField:'',
      BookName:'',
      bookIdNo:''
    }


   
    const validationSchema = Yup.object({
        relatedField: Yup
            .string()
            .required('Required')
    })

    const formSubmission = (values) => {
   
        console.log('form submission value',values);

        values.studentRecorId=values.relatedField._id;
        values.StudnetRollNo=values.relatedField.StudnetRollNo;
        values.BookName =parentRecord.BookName
        values.bookIdNo=parentRecord.bookIdNo;
        console.log('after  submission value',values);

        axios.post(url, values)
        .then((res) => {
            console.log('upsert record  response', res);
           
            setTimeout(() => {
                handleModal();
            }, 1000)
        })
        .catch((error) => {
            console.log('upsert record  error', error);
           
              setTimeout(() => {
                handleModal();
            }, 1000)
        })
    }

    const fetchStudentRecord=(newInputValue)=>{
        axios.post(`${fetchInventoriesbyName}?searchKey=${newInputValue}`)
        .then((res) => {
           
                setStudentRecord(res.data)
        })
        .catch((error) => {
            console.log('error fetchInventoriesbyName', error);
        })
    }

    return (

        <Grid item xs={12} style={{ margin: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <h3>Issue Book</h3> 
            </div>
            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
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
                        } = props;

                        return (
                            <>
                                
                              
                                <Form>
                                    <Grid container spacing={2}>
                                        {/* <Grid item xs={6} md={6}>
                                            <label htmlFor="BookName">BookName</label>
                                            <Field name="BookName" type="text" class="form-input" />
                                        </Grid> */}
                                        <Grid item xs={6} md={6}>
                                            <label htmlFor="relatedField">Student Name </label>
                                            <Autocomplete
                                                name="relatedField"
                                                className='form-customSelect'
                                                options={studentRecord}
                                                value={values.relatedField}
                                                getOptionLabel={option => option.FirstName || ''}
                                                // isOptionEqualToValue={(option, value) =>
                                                //     option.id === value
                                                // }
                                                onChange={(e, value) => {
console.log(value)
                                                    if(!value){                                
                                                        console.log('!value',value);
                                                        setFieldValue("studentRecorId",'')
                                                        setFieldValue("StudnetRollNo",'')
                                                      }else{
                                                        console.log('value',value);
                                                        setFieldValue("studentRecorId",value.id)
                                                        setFieldValue("StudnetRollNo",value)
                                                      }
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    console.log('newInputValue', newInputValue);
                                                    if (newInputValue.length >= 3) {
                                                        fetchStudentRecord(newInputValue);
                                                    }
                                                    else if (newInputValue.length == 0) {
                                                        fetchStudentRecord(newInputValue);
                                                    }
                                                }}
                                                renderInput={params => (
                                                    <Field component={TextField} {...params} name="InventoryId" />
                                                )}
                                            />

                                        </Grid>
                                        
                                    </Grid>

                                    <div className='action-buttons'>
                                        <DialogActions sx={{ justifyContent: "space-between" }}>

                                            <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Save</Button>

                                            <Button type="reset" variant="contained" onClick={handleModal}  >Cancel</Button>
                                        </DialogActions>
                                    </div>
                                </Form>
                            </>
                        )
                    }}
                </Formik>
            </div>
        </Grid>
    )
}

export default ModalStudentLoockup;
