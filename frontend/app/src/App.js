import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
