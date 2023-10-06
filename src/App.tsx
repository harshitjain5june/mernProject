import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Cart from './components/Cart';
import Orders from './components/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
 <Router>
  <Navbar />
  <Routes>
    <Route  path='/' element={<Home />} />
    <Route path='/login' element={<Home />} />
    <Route path='/signup' element={<Home />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/myorders' element={<Orders />} />
  </Routes>
  <div><Footer /></div>
 </Router>

 </ThemeProvider>
  );
}

export default App;
