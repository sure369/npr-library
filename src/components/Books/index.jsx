import React,{useEffect, useState} from 'react'
import { SampleBooksData } from '../Data\'s/booksData';
import '../styles/newForm.css'
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Box, Button, Typography, Modal
  , IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Pagination, Menu, MenuItem
} from "@mui/material";
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BookDataURL = `http://localhost:4500/getBookData`;
const DeleteBookDataURL = `http://localhost:4500/deleteBookData?bookid=`;



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

function Books() {

  const navigate =useNavigate()

  const [bookItemsPerPage, setBookItemsPerPage] = useState(2);
  const [bookPerPage, setBookPerPage] = useState(1);
  const [bookNoOfPages, setBookNoOfPages] = useState(0);

  const[Records,setRecords]=useState([])
  const[IssueModalOpen,setIssueModalOpen]=useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuSelectRec, setMenuSelectRec] = useState()
  const [menuOpen, setMenuOpen] = useState();


  useEffect(()=>{
    fetchRecords();

  },[])

  const fetchRecords=()=>{
    axios.post(BookDataURL)
    .then((res)=>{
      console.log(res)
      setRecords(res.data)
        // setBookNoOfPages(Math.ceil(res.data.length / bookItemsPerPage))


    })
    .catch((err)=>{
      console.log(err)
    })
  }



  const handleOnCellClick = (e, value) => {
    console.log(value)
     navigate("/bookdetailpage", {state:{ record: {value} }})
  }
  const onHandleDelete = (e, value) => {
    console.log(value)
  }


  const handleAddRecord = () => {
    console.log('inside new record')
    navigate("/bookdetailpage", {state:{ record: {} }})
  };

  const handleChangeBookPage=(e,value)=>{
    setBookPerPage(value);
  }



  const handleTaskMoreMenuClick = (item, event) => {
    setMenuSelectRec(item)
    setAnchorEl(event.currentTarget);
    setMenuOpen(true)

  };
  const handleMoreMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false)
  };
  
  
  const handleBookCardEdit = (row) => {
    console.log('selected record', row);
    const item = row;
    navigate("/bookdetailpage", { state: { record: { item } } })
  };

  const handleBookCardDelete = (e,row) => {
console.log(row)
    axios.post(DeleteBookDataURL+row._id)
    .then((res)=>{
      console.log(res)
      fetchRecords()
    })
    .catch((err)=>{
      console.log(err)
    })
   
  }

  const handleModalOpen=()=>{
    setIssueModalOpen(true)
  }

  const handleIssueModalClose=()=>{
    setIssueModalOpen(false)
  }

  return (
<>

      <div className='btn_end_position'>
        <Button
          sx={{ color: 'white', m: 2 }}
          variant="contained"
          onClick={handleAddRecord}
        >
          New
        </Button>
      </div>

{/* <CardView/> */}


<Card dense compoent="span" >

              {

Records.length > 0 ?
Records
                    .slice((bookPerPage - 1) * bookItemsPerPage, bookPerPage * bookItemsPerPage)
                    .map((item) => {
                      
                      return (
                        <div >
                          <CardContent sx={{ bgcolor: "aliceblue", m: "15px" }}>
                            <div
                              key={item._id}
                            >
                              <Grid 
                              container 
                              spacing={2}
                               alignItems="center"
                               justifyContent="center"
                               >
                              <Grid item xs={10} md={4}>
                                  <img src={item.imageURL}/>
                                </Grid>
                                <Grid item xs={10} md={4}>
                                  <div>BookName : {item.BookName} </div>
                                  <div>Author :{item.Author}</div>
                                  <div>Quantity : {item.Quantity} </div>
                                  <div>Book IdNo : {item.bookIdNo} </div>
                                  <div>Category : {item.category} </div>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                  <Button onClick={handleModalOpen}>Issue Book</Button>
                                </Grid>
                                <Grid item xs={2} md={2}>

                                  <IconButton>
                                    <MoreVertIcon onClick={(event) => handleTaskMoreMenuClick(item, event)} />
                                    <Menu
                                      anchorEl={anchorEl}
                                      open={menuOpen}
                                      onClose={handleMoreMenuClose}
                                      anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                      }}
                                    >
                                      <MenuItem onClick={() => handleBookCardEdit(menuSelectRec)}>Edit</MenuItem>
                                      <MenuItem onClick={(e) => handleBookCardDelete(e,menuSelectRec)}>Delete</MenuItem>
                                    </Menu>
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </div>
                          </CardContent>
                        </div>

                      );
                    })
                  : ""
              }
 {
              Records.length > 0 &&
              <Box display="flex" alignItems="center" justifyContent="center">
                <Pagination
                  count={bookNoOfPages}
                  page={bookPerPage}
                  onChange={handleChangeBookPage}
                  defaultPage={1}
                  color="primary"
                  size="medium"
                  showFirstButton
                  showLastButton
                />
              </Box>
            }
            </Card>
    
            <Modal
        open={IssueModalOpen}
        onClose={handleIssueModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box sx={ModalStyle}>
          ggggg
          {/* <ModalConAccount  handleModal={handleIssueModalClose} /> */}
        </Box>
      </Modal>
    </>
  )
}

export default Books