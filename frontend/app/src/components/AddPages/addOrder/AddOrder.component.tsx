import { Button, TextField } from "@mui/material";
import React, { Component, memo, useEffect, useState } from "react";
import '../styles.css';
import { columnsBox, columnsClient, columnsMark, handleBack } from "../sharedAddPages.ts";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'Kod_Marki', headerName: 'Kod marki', width: 100 },
    { field: 'Name', headerName: 'Name', width: 200 },
  ];

function AddOrder() {
    type dataBoxesType = {id: number, Kod_Box?: number, Kod_Klienta?: number, Kod_Marki?: number, Status_Zanyatosti?: string}[];
    const [dataMark, setDataMark] = useState<dataBoxesType>([{id:0}]);
    const [dataBoxes, setDataBox] = useState<dataBoxesType>([{id:0}]);
    const [dataCLient, setDataClient] = useState<dataBoxesType>([{id:0}]);
    const [modelAuto, setModelAuto] = useState<string>('')

    let markOrerId = 0;
    let boxOrderId = 0;
    let clientOrderId = 0;

    useEffect(()=>{
      axios.get('http://localhost:8081/get-marks')
      .then(res=>{
          let index1 = 0;
          const _data1 = res.data.map((e:{})=>{index1 += 1; return {id: index1,...e}}) 
          console.log(_data1);
          setDataMark(_data1);
      })
      .catch(err=>console.log(err));

      axios.get('http://localhost:8081/get-clients')
      .then(res=>{
          let index2 = 0;
          const _data2 = res.data.map((e:{})=>{index2 += 1; return {id: index2,...e}}) 
          console.log(_data2);
          setDataClient(_data2);
      })
      .catch(err=>console.log(err));

      axios.get('http://localhost:8081/get-boxes')
      .then(res=>{
          let index3 = 0;
          const _data3 = res.data.map((e:{})=>{index3 += 1; return {id: index3,...e}}); 
          console.log(_data3);
          setDataBox(_data3);
      })
      .catch(err=>console.log(err))      

      },[])

      const AddOrder = () =>
        {
          const data = { 
            Kod_Box: dataBoxes.find(el=>el?.id === boxOrderId)?.Kod_Box ?? '',
            Kod_Klienta: dataCLient.find(el=>el?.id === clientOrderId)?.Kod_Klienta ?? '', 
            Kod_Marki: dataMark.find(el=>el?.id === markOrerId)?.Kod_Marki ?? '',
            Model: modelAuto,
          }
          
          axios.post('http://localhost:8081/add-new-order', data)
          .then(res=>{
          if(res.status === 200)
            {
              alert('Запись  стоянке добавлена');
              window.location.reload();
            }
          })
          .catch(err=>console.log(err))
        }      

    return( <div className="base-container" >
              <div className="base-conatainer__base-body base-container__base-body__bordered multi-journal">
                <div className="button">
                  <Button variant="contained" onClick={()=>handleBack()}>На главную</Button>
                </div>
                <div className="button">
                  <Button variant="contained" onClick={()=>AddOrder()}>Добавить запись</Button>
                </div>
                <div className="input-box">
                                   <TextField id="standard-basic" label="Модель" variant="standard" value={modelAuto} onChange={e => {setModelAuto(e.target.value)}}/>
                </div>
                <div className="table-unit">
                Выберите клиента:
                              <DataGrid
                                      rows={dataCLient}
                                      columns={columnsClient}
                                      initialState={{
                                        pagination: {
                                          paginationModel: { page: 0, pageSize: 5 },
                                        },
                                      }}
                                      pageSizeOptions={[5, 10]}
                                      isRowSelectable={()=>true}
                                      onRowSelectionModelChange={(newSelection) => {
                                        clientOrderId = newSelection[0] as number;
                                        console.log("selection", newSelection[0]);
                                      }}
                                    />
               </div>
               <div className="table-unit">
                Выберите Марку:
                              <DataGrid
                                      rows={dataMark}
                                      columns={columnsMark}
                                      initialState={{
                                        pagination: {
                                          paginationModel: { page: 0, pageSize: 5 },
                                        },
                                      }}
                                      pageSizeOptions={[5, 10]}
                                      isRowSelectable={()=>true}
                                      onRowSelectionModelChange={(newSelection) => {
                                        markOrerId = newSelection[0] as number;
                                        console.log("selection", newSelection[0]);
                                      }}
                                    />
                        
               </div>
               <div className="table-unit">
                Выберите Бокс:
                              <DataGrid
                                      rows={dataBoxes.filter(el => el.Status_Zanyatosti !== 'Занят')}
                                      columns={columnsBox}
                                      initialState={{
                                        pagination: {
                                          paginationModel: { page: 0, pageSize: 5 },
                                        },
                                      }}
                                      pageSizeOptions={[5, 10]}
                                      isRowSelectable={()=>true}
                                      onRowSelectionModelChange={(newSelection) => {
                                        boxOrderId = newSelection[0] as number;
                                        console.log("selection", newSelection[0]);
                                      }}
                                    />
               </div>
              </div>
            </div>

  )
}

export default memo(AddOrder);
