import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Users from './pages/jsonplaceholder/Users';
import Species from './pages/swapi/Species';
import Starships from './pages/swapi/Starship';
import News from './pages/news/News';
import NotMatch from './pages/NotMatch';
import Hobbies from './pages/rapidapi/Hobbies';

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
          <Route path='/news' element={<News/>}/>
          <Route path='/hobbies' element={<Hobbies/>}/>


          <Route path='*' element={<NotMatch/>} />

        </Routes>

        <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
