import { Link } from 'react-router-dom'
import SignUp from './signUp'
import Login from './Login'
import { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store';
import Modal from './Modal';
import Cart from './Cart';
import '../styles/navbar.css'
function Navbar() {
  const history = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cartData)
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [cartView, setCartView] = useState(false);
  const handleCloseLogin = () => {
    setShowLogin(false);
    history('/');
  }
  const handleCloseSignUp = () => {
    setShowSignUp(false);
    history('/');
  }

  const handleShowLogin = () => {
    setShowLogin(true);
  }

  const handleShowSignup = () => {
    setShowSignUp(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
  }


  return (
    <nav style={{ backgroundColor: "#1F1B24" }} className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand fs-3 fst-italic">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'/'}
                className="nav-link active fs-6 fw-bold nav-button" aria-current="page">Home</Link>
            </li>

            {localStorage.getItem("authToken") ? <li className="nav-item">
              <Link to={'/myorders'} className="nav-link active fs-6 fw-bold nav-button" aria-current="page">My Orders</Link>
            </li> : ""}
          </ul>
          <div className="d-flex align-items-center">
            {!localStorage.getItem("authToken") ? <><Link to={'/login'} className="btn bg-white fw-bold text-success mx-1" onClick={() => { setShowLogin(true) }}>Login</Link>
              <Link to={'/signup'} className="btn bg-white fw-bold text-success mx-1" onClick={() => { setShowSignUp(true) }}>SignUp</Link>
            </> : <><Link to={'/'} onClick={() => setCartView(true)} className="btn bg-white fw-bold text-success mx-1"><ShoppingCartIcon />My Cart {"  "} <Badge pill bg="danger" >{cart.length}</Badge> </Link>
              <Link to={'/'} onClick={handleLogout} className="btn bg-white fw-bold text-success mx-1">Logout</Link>
            </>
            }
            {showSignUp && <SignUp onOpenLogin={handleShowLogin} onClose={handleCloseSignUp} />}
            {showLogin && <Login onOpenSignUp={handleShowSignup} onClose={handleCloseLogin} />}
          </div>
          {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
        </div>
      </div>
    </nav>


  )
}

export default Navbar