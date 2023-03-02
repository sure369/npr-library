import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Pagination,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalStudentLoockup from "../recordDetailpage/ModalStudentLoockup";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const BookRelatedItems = ({ item }) => {

  const urlgetStudentsbyBookId = `http://localhost:4500/getStudentsbyBookId?searchId=`;

  const navigate = useNavigate();
  const location = useLocation();

  const [bookRecordId, setBookRecordId] = useState();
  const [relatedStudents, setRelatedStudents] = useState([]);

  const [studentModalOpen, setStudentModalOpen] = useState(false);

  useEffect(() => {
    console.log("passed book record", location.state.record.item);
    if(location.state.record.item){
    setBookRecordId(location.state.record.item._id);
    getStudentsbyBookId(location.state.record.item._id);
    }
  }, []);



  const getStudentsbyBookId = (bookId) => {
    console.log("inside getStudentsbyBookId record Id", bookId);

    axios
      .post(urlgetStudentsbyBookId+bookId)
      .then((res) => {
        console.log("response getStudentsbyBookId fetch", res);
        if (res.data.length > 0) {
          setRelatedStudents(res.data);
        } else {
          setRelatedStudents([]);
        }
      })
      .catch((error) => {
        console.log("error getStudentsbyBookId fetch", error);
      });
  };

  const handleStudentModalOpen = () => {
    setStudentModalOpen(true);
  };
  const handleStudentModalClose = () => {
    setStudentModalOpen(false);
    setRelatedStudents(bookRecordId);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h3> Related Items</h3>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            Student list ({relatedStudents.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ textAlign: "end", marginBottom: "5px" }}>
              <Button
                variant="contained"
                color="info"
                onClick={() => handleStudentModalOpen()}
              >
                Issue Book
              </Button>
            </div>
            <Card dense compoent="span">
              {relatedStudents.length > 0
                ? relatedStudents.map((item) => {
                    return (
                      <div>
                        <CardContent sx={{ bgcolor: "white", m: "15px" }}>
                          <div key={item._id}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                <div>
                                  Student Name :{" "}
                                  {item.FirstName + item.LastName}{" "}
                                </div>
                                <div>Department :{item.Department}</div>
                                <div>Year : {item.Year} </div>
                              </Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </div>
                    );
                  })
                : ""}
            </Card>
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
          <ModalStudentLoockup
            data={location.state.record.item}
            handleModal={handleStudentModalClose}
          />
        </Box>
      </Modal>
    </>
  );
};
export default BookRelatedItems;
