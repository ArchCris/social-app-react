import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';
import Navbar from './components/Navbar';
import Createpost from './pages/createpost/Createpost';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/createpost' element={<Createpost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
