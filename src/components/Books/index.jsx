import React,{useEffect, useState} from 'react'
import { SampleBooksData } from '../Data\'s/booksData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/newForm.css'
import { useNavigate } from 'react-router-dom';

import {
  Card, CardContent, Box, Button, Typography, Modal
  , IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Pagination, Menu, MenuItem
} from "@mui/material";
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BookDataURL = `${process.env.REACT_APP_SERVER_URL}/getBookData`;
const DeleteBookDataURL = `${process.env.REACT_APP_SERVER_URL}/deleteBookData?bookid=`;

function Books() {

  const navigate =useNavigate()

  const [bookItemsPerPage, setBookItemsPerPage] = useState(2);
  const [bookPerPage, setBookPerPage] = useState(1);
  const [bookNoOfPages, setBookNoOfPages] = useState(0);

  const[Records,setRecords]=useState([])

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

  const columns = [
    {
      field: "BookName", headerName: "Book Name",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "Author", headerName: "Author",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "Quantity", headerName: "Quantity",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "category", headerName: "Category",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "img", headerName: "Book Image",
      headerAlign: 'center', align: 'center', flex: 1,
      renderCell:(params)=>{
        return(
          <>
          <img src={params.value} style={{height:'100%', width:'fit-content'}}></img>
          </>
        )
      }
    },
    {
      field: 'actions', headerName: 'Actions',
      headerAlign: 'center', align: 'center', width: 400, flex: 1,
      renderCell: (params) => {
        return (
          <>

            <IconButton style={{ padding: '20px', color: '#0080FF' }}>
              <EditIcon onClick={(e) => handleOnCellClick(e, params.row)} />
            </IconButton>
            <IconButton style={{ padding: '20px', color: '#FF3333' }}>
              <DeleteIcon onClick={(e) => onHandleDelete(e, params.row)} />
            </IconButton>
          </>
        )
      }
    }
  ];


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

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuSelectRec, setMenuSelectRec] = useState()
  const [menuOpen, setMenuOpen] = useState();

  const handleTaskMoreMenuClick = (item, event) => {
    setMenuSelectRec(item)
    setAnchorEl(event.currentTarget);
    setMenuOpen(true)

  };
  const handleMoreMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false)
  };
  
  
  const handleTaskCardEdit = (row) => {
    console.log('selected record', row);
    const item = row;
    navigate("/bookdetailpage", { state: { record: { item } } })
  };

  const handleReqTaskCardDelete = (e,row) => {
console.log(row)
    axios.post(DeleteBookDataURL+row._id)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
   
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
                              <Grid item xs={10} md={5}>
                                  <img src={item.img}/>
                                </Grid>
                                <Grid item xs={10} md={5}>
                                  <div>BookName : {item.BookName} </div>
                                  <div>Author :{item.Author}</div>
                                  <div>Quantity : {item.Quantity} </div>
                                  <div>Book IdNo : {item.bookIdNo} </div>
                                  <div>Category : {item.category} </div>
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
                                      <MenuItem onClick={() => handleTaskCardEdit(menuSelectRec)}>Edit</MenuItem>
                                      <MenuItem onClick={(e) => handleReqTaskCardDelete(e,menuSelectRec)}>Delete</MenuItem>
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


{/*{
  SampleBooksData.map((item)=>{

    console.log(item)
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.BookName}
            </Typography>
            <Typography variant="body2" color="text.secondary">   Author - {item.Author} </Typography>
            <Typography variant="body2" color="text.secondary">   Quantity - {item.Quantity} </Typography>
            <Typography variant="body2" color="text.secondary">   BookIdNo - {item.bookIdNo} </Typography>
            <Typography variant="body2" color="text.secondary">   Category- {item.category} </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    );

  })
} */}

      {/* <DataGrid
        rows={SampleBooksData}
        columns={columns}
        getRowId={(row) => row.bookIdNo}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      /> */}
    
    </>
  )
}

export default Books