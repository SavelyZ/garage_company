import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.component.tsx';
import Boxes from './components/Boxes/Boxes.component.tsx';
function App() {
  return (
    <>
    <Header></Header>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Boxes></Boxes>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
