import { GridColDef } from "@mui/x-data-grid";

export const locationTo = (link) => {
    window.location.assign(link);
}

export const handleBack = () => {
    locationTo('/');
};

export const columnsMark: GridColDef[] = [
    { field: 'Kod_Marki', headerName: 'Kod marki', width: 100 },
    { field: 'Name', headerName: 'Name', width: 200 },
  ];

export const columnsClient: GridColDef[] = [
    { field: 'Kod_Klienta', headerName: 'Номер машиноместа', width: 230 },
    { field: 'FIO', headerName: 'FIO', width: 230 },
    { field: 'Telephone_Number', headerName: 'Number', width: 200 },
  ];

export const columnsBox: GridColDef[] = [
    { field: 'Kod_Box', headerName: 'Номер гаража', width: 200 },
    { field: 'Status_Zanyatosti', headerName: 'Занятость', width: 200 },
  ];