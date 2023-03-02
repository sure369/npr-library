
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
import ModalBookLoockup from "../recordDetailpage/ModalBookLoockup";

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

const StudentRelatedItems = ({ props }) => {

  const urlgetBooksbyStudentId = `http://localhost:4500/getBooksbyStudentId?searchId=`;


  const location = useLocation();

  const [studentRecordId, setStudentRecordId] = useState();
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  useEffect(() => {
    console.log("passed student record", location.state.record.item);
    if(location.state.record.item){
      setStudentRecordId(location.state.record.item._id);
      getBooksbyStudentId(location.state.record.item._id);
    }
 
  }, []);

  const getBooksbyStudentId = (stdId) => {
    console.log("inside getBooksbyStudentId record Id", stdId);

    axios
      .post(urlgetBooksbyStudentId + stdId)
      .then((res) => {
        console.log("response getBooksbyStudentId fetch", res);
        if (res.data.length > 0) {
          setRelatedBooks(res.data);
        } else {
          setRelatedBooks([]);
        }
      })
      .catch((error) => {
        console.log("error getBooksbyStudentId fetch", error);
      });
  };

  const handleBookModalOpen = () => {
    setBookModalOpen(true);
  };
  const handleBookModalClose = () => {
    setBookModalOpen(false);
    setRelatedBooks(studentRecordId);
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
          <Typography variant="h6">
             Books list ({relatedBooks.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ textAlign: "end", marginBottom: "5px" }}>
              <Button
                variant="contained"
                color="info"
                onClick={() => handleBookModalOpen()}
              >
                Add Book
              </Button>
            </div>
            <Card dense compoent="span">
              {relatedBooks.length > 0
                ? relatedBooks.map((item) => {
                    return (
                      <div>
                        <CardContent sx={{ bgcolor: "white", m: "15px" }}>
                          <div key={item._id}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                <div>Student Name :{item.FirstName + item.LastName}</div>
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
        open={bookModalOpen}
        onClose={handleBookModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box sx={ModalStyle}>
          <ModalBookLoockup
            data={location.state.record.item}
            handleModal={handleBookModalClose}
          />
        </Box>
      </Modal>
    </>
  );
};
export default StudentRelatedItems;
