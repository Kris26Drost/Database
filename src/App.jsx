import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Users from './pages/jsonplaceholder/Users';
import Species from './pages/swapi/Species';
import Starships from './pages/swapi/Starship';

function App() {
  return (
    <div className='App'>
      
      <BrowserRouter>

        <Navbar>
        </Navbar>

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/user' element={<Users />}/>
          <Route path='/species' element={<Species/>}/>
          <Route path='/starships' element={<Starships/>}/>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
