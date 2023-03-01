import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Box, Button, Typography, Modal
  , IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Pagination, Menu, MenuItem
} from "@mui/material";
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalStudentLoockup from "../recordDetailpage/ModalStudentLoockup";

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const BookRelatedItems = ({ item }) => {

  const taskDeleteURL = `${process.env.REACT_APP_SERVER_URL}/deleteTask?code=`;
  const urlgetTaskbyAccountId = `${process.env.REACT_APP_SERVER_URL}/getTaskbyAccountId?searchId=`;
  const urlgetContactbyAccountId=`${process.env.REACT_APP_SERVER_URL}/getContactsbyAccountId?searchId=`;
  const contactDeleteURL=`${process.env.REACT_APP_SERVER_URL}/deleteContact?code=`;

  const navigate = useNavigate();
  const location = useLocation();
  
  const [accountRecordId, setAccountRecordId] = useState()
  const [relatedTask, setRelatedTask] = useState([]);


  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [taskItemsPerPage, setTaskItemsPerPage] = useState(2);
  const [taskPerPage, setTaskPerPage] = useState(1);
  const [taskNoOfPages, setTaskNoOfPages] = useState(0);



  useEffect(() => {
    console.log('inside  acc related useEffect', location.state.record.item);
    setAccountRecordId(location.state.record.item._id)
    getTasksbyAccountId(location.state.record.item._id)
  }, [])


  const getTasksbyAccountId = (accId) => {
  
    console.log('inside getTasks record Id', accId);

    axios.post(urlgetTaskbyAccountId + accId)
      .then((res) => {
        console.log('response getTasks fetch', res);
        if (res.data.length > 0) {
          setRelatedTask(res.data);
          setTaskNoOfPages(Math.ceil(res.data.length / taskItemsPerPage));
          setTaskPerPage(1)
        }
        else {
          setRelatedTask([]);
        }
      })
      .catch((error) => {
        console.log('error task fetch', error)
      })
  }

  const handleStudentModalOpen = () => {
    setStudentModalOpen(true);
  }
  const handleStudentModalClose = () => {
    setStudentModalOpen(false);
    getTasksbyAccountId(accountRecordId)
  }


 
  const handleChangeTaskPage = (event, value) => {
    setTaskPerPage(value);
  };




  return (
    <>
     
         <div style={{ textAlign: "center", marginBottom: "10px" }}>

        <h3> Issued Book Items</h3>

      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Student list ({relatedTask.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ textAlign: "end", marginBottom: "5px" }}>
              <Button variant="contained" color="info" onClick={() => handleStudentModalOpen()} >Issue Book</Button>
            </div>
            <Card dense compoent="span" >

              {

                relatedTask.length > 0 ?
                  relatedTask
                    .slice((taskPerPage - 1) * taskItemsPerPage, taskPerPage * taskItemsPerPage)
                    .map((item) => {


                      return (
                        <div >
                          <CardContent sx={{ bgcolor: "white", m: "15px" }}>
                            <div
                              key={item._id}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                  <div>Student Name : {item.FirstName+item.LastName} </div>
                                  <div>Department :{item.Department}</div>
                                  <div>Year : {item.Year} </div>
                                </Grid>
                              </Grid>
                            </div>
                          </CardContent>
                        </div>

                      );
                    })
                  : ""
              }

            </Card>
            {
              relatedTask.length > 0 &&
              <Box display="flex" alignItems="center" justifyContent="center">
                <Pagination
                  count={taskNoOfPages}
                  page={taskPerPage}
                  onChange={handleChangeTaskPage}
                  defaultPage={1}
                  color="primary"
                  size="medium"
                  showFirstButton
                  showLastButton
                />
              </Box>
            }

          </Typography>
        </AccordionDetails>
      </Accordion>
   
      <Modal
        open={studentModalOpen}
        onClose={handleStudentModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box sx={ModalStyle}>
        <ModalStudentLoockup data={ location.state.record.item}  handleModal={handleStudentModalClose} />
        </Box>
      </Modal>



    </>
  )

}
export default BookRelatedItems

