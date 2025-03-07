import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.component.tsx';
import Boxes from './components/Boxes/Boxes.component.tsx';
import AddNewBox from './components/AddPages/AddNewBox/AddNewBox.component.tsx'
import AddNewMark from './components/AddPages/AddNewMark/AddNewMark.component.tsx'
import AddNewClient from './components/AddPages/AddNewClient/AddNewClient.component.tsx'
import AddOrder from './components/AddPages/addOrder/AddOrder.component.tsx';
function App() {
  return (
    <>
    <Header></Header>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Boxes></Boxes>}></Route>
        <Route path='/add-box' element={<AddNewBox></AddNewBox>}></Route>
        <Route path='/add-mark' element={<AddNewMark></AddNewMark>}></Route>
        <Route path='/add-client' element={<AddNewClient></AddNewClient>}></Route>
        <Route path='/add-order' element={<AddOrder></AddOrder>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
