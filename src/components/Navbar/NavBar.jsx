import React from 'react'
import { CartWidget } from '../CartWidget/CartWidget'
import styles from "./NavBar.modules.css"
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">

      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> Only-Tech </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/smartphones"> Celulares </Link></li>
                <li><Link className="dropdown-item" to="/category/watches"> Relojes </Link></li>
                <li><Link className="dropdown-item" to="/category/airpods"> Auriculares </Link></li>
                <li><Link className="dropdown-item" to="/category/notebooks"> Notebooks </Link></li>
                <li><Link className="dropdown-item" to="/category/tablets"> Tablets </Link></li>
                <li><Link className="dropdown-item" to="/category/keyboards"> Teclados </Link></li>
              </ul>
            </li>
            
          </ul>
          <div className="nav-item">
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-info" type="submit">Buscar</button>
            </form> */}
          </div>
          <Link to="/cart"> <CartWidget /> </Link>
        </div>
      </div>
    </nav>
  )
}