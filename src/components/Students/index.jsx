import React, { useEffect,useState } from 'react'
import { StudendSampleData } from '../Data\'s/stdData'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/newForm.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDataURL = `${process.env.REACT_APP_SERVER_URL}/getStudentData`;
const DeleteStudentDataURL = `${process.env.REACT_APP_SERVER_URL}/deleteStudentData?studentid=`;

function Students() {

  const[Records,setRecords]=useState([])

  const navigate =useNavigate()
  useEffect(()=>{
    fetchRecords();
  },[])

  const fetchRecords=()=>{
    axios.post(StudentDataURL)
    .then((res)=>{
      console.log(res)
      setRecords(res.data)

    })
  }

  const columns = [
    {
      field: "StudnetRollNo", headerName: "Studnet RollNo",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "FirstName", headerName: "Name",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "Department", headerName: "Department",
      headerAlign: 'center', align: 'center', flex: 1,
    },
    {
      field: "Year", headerName: "Year",
      headerAlign: 'center', align: 'center', flex: 1,
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
     navigate("/studentdetailpage", {state:{ record: {value} }})
  }
  const onHandleDelete = (e, value) => {
    axios.post(DeleteStudentDataURL+value._id)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const handleAddRecord = () => {
    console.log('inside new record')
    navigate("/studentdetailpage", {state:{ record: {} }})
  };
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <div className='btn_end_position'>
        <Button
          sx={{ color: 'white', m: 2 }}
          variant="contained"
          onClick={handleAddRecord}
        >
          New
        </Button>
      </div>



      <DataGrid
        rows={Records}
        columns={columns}
        getRowId={(row) => row.StudnetRollNo}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}

export default Students