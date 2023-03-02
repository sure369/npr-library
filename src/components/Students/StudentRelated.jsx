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
    if (location.state.record.item) {
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

const handleReturnBook=()=>{
  console.log('handleReturnBook');
}

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
            <div style={{ textAlign: "end", marginBottom: "5px" }}></div>
            <Card dense compoent="span">
              {relatedBooks.length &&
                Object.keys(relatedBooks).map((key) => {
                  return (
                    <div>
                      <CardContent sx={{ bgcolor: "white", m: "15px" }}>
                        <div key={key}>
                          {relatedBooks[key].map((dataItem) => {
                            console.log(dataItem,'dataItem');
                            return (
                              <>
                                <Grid container spacing={2}>
                                  <Grid item xs={8} md={8}>
                                    <div>BookName :{dataItem.BookName}</div>
                                    <div>category :{dataItem.category}</div>
                                    <div>Author : {dataItem.Author} </div>
                                  </Grid>
                                  <Grid item xs={4} md={4}>
                                    <Button
                                      variant="contained"
                                      onClick={() => handleReturnBook()}
                                    >
                                      Return
                                    </Button>
                                  </Grid>
                                </Grid>
                              </>
                            );
                          })}
                        </div>
                      </CardContent>
                    </div>
                  );
                })}
            </Card>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default StudentRelatedItems;
