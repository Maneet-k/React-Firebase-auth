import './App.css';
import {Route ,Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Private from './Pages/Private';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoute';
import PhLogin from './Pages/PhLogin';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/home' element={<ProtectedRoutes><Private/></ProtectedRoutes>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/phlogin' element={<PhLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
