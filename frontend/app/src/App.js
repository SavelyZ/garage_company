import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home/Home.component';
import AddCar from './AddCar/AddCar.component';
import CarCard from './CarCard/CarCard.component';
import Boxes from './components/Boxes/Boxes.component.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Boxes></Boxes>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
