import React from 'react'
import { Link } from 'react-router-dom'
import SignUp from './signUp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const history = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false)
  const handleCloseSignUp = () => {
    setShowSignUp(false);
    history('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand fs-3 fst-italic" >GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'/'} className="nav-link active" aria-current="page" >Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/login'} className="nav-link" >Login</Link>
            </li>
            <li className="nav-item">
              <Link to={'/signup'} className="nav-link" onClick={() => {setShowSignUp(true)}} >SignUp</Link>
              {showSignUp && <SignUp onClose={handleCloseSignUp} />}
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar