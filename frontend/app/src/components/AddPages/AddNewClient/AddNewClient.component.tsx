import { Button, TextField } from "@mui/material";
import React, { Component, memo, useEffect, useState } from "react";
import '../styles.css';
import { handleBack } from "../sharedAddPages.ts";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'Kod_Klienta', headerName: 'Kod car', width: 70 },
    { field: 'FIO', headerName: 'FIO', width: 200 },
    { field: 'Telephone_Number', headerName: 'Number', width: 200 },
  ];

function AddNewClient() {
    type dataBoxesType = {}[];
    const [data, setData] = useState<dataBoxesType>([{id:0, FIO:''}]);
    const [fio, setFio] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const AddClient = () => {
      const data = {
        FIO: fio,
        Telephone_Number: phoneNumber,
      }
      axios.post('http://localhost:8081/add-new-client', data)
      .then(res=>{
        if(res.status === 200)
          {
            alert('Клиент Добавлен');
            window.location.reload();
          }
      })
      .catch(err=>console.log(err))
    }

    useEffect(()=>{
      axios.get('http://localhost:8081/get-clients')
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
                <div className="input-box">
                <TextField id="standard-basic" label="ФИО" variant="standard" value={fio} onChange={e => {setFio(e.target.value)}}/>
                </div>
                <div className="input-box">
                <TextField id="standard-basic" label="Номер телефона" variant="standard" value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value)}} />
                </div>
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

export default memo(AddNewClient);
