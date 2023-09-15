import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Cart from './components/Cart';


function App() {
  
  return (
 <Router>
  <Routes>
    <Route  path='/' element={<Home />} />
    <Route path='/login' element={<Home />} />
    <Route path='/signup' element={<Home />} />
    <Route path='/cart' element={<Cart />} />
  </Routes>
 </Router>
  );
}

export default App;
