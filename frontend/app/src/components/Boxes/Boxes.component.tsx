import React, { memo, useEffect, useState } from "react";
import axios from 'axios';
import './Boxes.styles.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import '../../App.css'
import { locationTo } from "../AddPages/sharedAddPages";

const columns: GridColDef[] = [
    { field: 'Kod_Car', headerName: 'Номер машиноместа', width: 230 },
    { field: 'FIO_Vladeltsa', headerName: 'FIO', width: 270 },
    { field: 'Kod_Box', headerName: 'Kod box', width: 130 },
    { field: 'Marka_Avto', headerName: 'Marka', width: 130 },
    { field: 'Model_Avto', headerName: 'Model', width: 130 },
    { field: 'Status_Zanyatosti', headerName: 'Status', width: 130 },
    { field: 'Telefon_Vladeltsa', headerName: 'Phone', width: 130 },

  ];
  
function Boxes() {
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

    let selections: any[];

    return (
      <div className="base-container" >
        <div className="base-conatainer__base-body base-container__base-body__bordered">
          <div className="boxes-container">
          <div className="button-container">
          <Button variant="contained" onClick={()=>{window.location.assign('/add-order')}}>Add</Button>
          <Button variant="contained">Delete</Button>
        </div>
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
          onRowSelectionModelChange={(newSelection) => {
            selections = newSelection;
            console.log("selection", selections)
          }}
        />
          </div>
        </div>
      </div>
    );
  };

  export default memo(Boxes);
  