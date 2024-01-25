import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar(){
        return (
            <nav className="navbar navbar-expand-lg bg-dark shadow" >
            <div className="container">
          <Link to='/' className="navbar-brand nav-link" href="#">Kullanıcı Rehber</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <Link to='/' className="nav-link" href="#">Anasayfa </Link>
              </li>
              <li className="nav-item">
                <Link to='/personAdd' className="nav-link" href="#">Kullanıcı Ekle</Link>
              </li>
              <li className="nav-item">
                <Link to='/groups' className="nav-link" href="#"> Gruplar </Link>
              </li>
              <li className="nav-item">
                <Link to='/searchByName' className="nav-link" href="#"> İsim İle Arama </Link>
              </li>
              <li className="nav-item">
                <Link to='/searchBySurName' className="nav-link" href="#"> Soyisim İle Arama </Link>
              </li>
              <li className="nav-item">
                <Link to='/searchByGroup' className="nav-link" href="#"> Grup İle Arama </Link>
              </li>
            </ul>
          </div>
          </div>
        </nav>
            )
}

export default Navbar;