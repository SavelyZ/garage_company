import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Boxes.styles.css';
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import '../../App.css'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70},
    { field: 'FIO_Vladeltsa', headerName: 'FIO', width: 70 },
    { field: 'Kod_Box', headerName: 'Kod box', width: 130 },
    { field: 'Kod_Car', headerName: 'Kod car', width: 130 },
    { field: 'Marka_Avto', headerName: 'Marka', width: 130 },
    { field: 'Model_Avto', headerName: 'Model', width: 130 },
    { field: 'Status_Zanyatosti', headerName: 'Status', width: 130 },
    { field: 'Telefon_Vladeltsa', headerName: 'Phone', width: 130 },

  ];
  
  export default function Boxes() {
  type dataBoxesType = {}[];
  const [data, setData] = useState<dataBoxesType>([{id:0, FIO:''}]);

  useEffect(()=>{
    axios.get('http://localhost:8081/get-boxes')
    .then(res=>{
        let index = 0;
        const _data = res.data.map((e:{})=>{index += 1; return {id: index,...e}}) 
        console.log(_data);
        setData(_data);
    })
    .catch(err=>console.log(err))
    },[])

    useEffect(()=>{console.log(data)},[data])

    return (
      <div style={{ height: 400, width: '100%' }} >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 3 },
            },
          }}
          pageSizeOptions={[3, 10]}
          checkboxSelection
        />
        <div className="buttonContainer"> 
          <Button variant="contained">New client</Button>
          <Button variant="contained">New box</Button>
          <Button variant="contained">New Mark</Button>
        </div>
      </div>
    );
  }
  