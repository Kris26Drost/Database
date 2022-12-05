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
import Pokemon from './pages/rapidapi/Pokemon';
import Facts from './pages/rapidapi/Facts';
import LoveCalculator from './pages/rapidapi/LoveCalculator';

import Weather1 from './pages/weather/Weather1';
import Weather2 from './pages/weather/Weather2';
import Weather3 from './pages/weather/Weather3';

import Jokes from './pages/opgave12/Jokes';

import Todos from './pages/airtable/Todos';
import TodoCreate from './pages/airtable/TodoCreate';
import TodoAdmin from './pages/airtable/TodoAdmin';
import TodoEdit from './pages/airtable/TodoEdit';

import Animals from './pages/wildlife/Animals';
import AnimalsAdmin from './pages/wildlife/AnimalsAdmin';
import AnimalsCreate from './pages/wildlife/AnimalsCreate';
import AnimalsEdit from './pages/wildlife/AnimalsEdit';


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
          <Route path='/pokemon' element={<Pokemon/>}/>
          <Route path='/facts' element={<Facts/>}/>
          <Route path='/lovecalc' element={<LoveCalculator/>}/>

          <Route path='/weather1' element={<Weather1/>}/>
          <Route path='/weather2' element={<Weather2/>}/>
          <Route path='/weather3' element={<Weather3/>}/>

          <Route path='/jokes' element={<Jokes/>}/>

          <Route path='/todos' element={<Todos/>}/>
          <Route path='/oprettodo' element={<TodoCreate/>}/>
          <Route path='/rettodo/:id' element={<TodoEdit/>}/>
          <Route path='/admintodo' element={<TodoAdmin/>}/>

          <Route path='/animals' element={<Animals/>}/>
          <Route path='/opretanimal' element={<AnimalsCreate/>}/>
          <Route path='/retanimal/:id' element={<AnimalsEdit/>}/>
          <Route path='/adminanimal' element={<AnimalsAdmin/>}/>


          <Route path='*' element={<NotMatch/>} />

        </Routes>

        <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
