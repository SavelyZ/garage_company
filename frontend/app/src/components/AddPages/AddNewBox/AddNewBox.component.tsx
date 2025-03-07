import { Button, TextField } from "@mui/material";
import React, { Component, memo, useEffect, useState } from "react";
import '../styles.css';
import { handleBack } from "../sharedAddPages.ts";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'Kod_Box', headerName: 'FIO', width: 70 },
    { field: 'Status_Zanyatosti', headerName: 'Занятость', width: 200 },
  ];

function AddNewBox() {
    type dataBoxesType = {}[];
    const [data, setData] = useState<dataBoxesType>([{id:0, FIO:''}]);
    const AddClient = () => {
      axios.post('http://localhost:8081/add-new-box')
      .then(res=>{
        if(res.status === 200)
          {
            alert('Бокс Добавлен');
            window.location.reload();
          }
      })
      .catch(err=>console.log(err))
    }

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

    return( <div className="base-container" >
              <div className="base-conatainer__base-body base-container__base-body__bordered">
                <div className="button">
                  <Button variant="contained" onClick={()=>AddClient()}>Добавить</Button>
                </div>
                <div className="button">
                  <Button variant="contained" onClick={()=>handleBack()}>На главную</Button>
                </div>
                <div className="table-unit">
                <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        isRowSelectable={()=>false}
                      />
                </div>
              </div>
            </div>
  )
}

export default memo(AddNewBox);
