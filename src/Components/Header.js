import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">

                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">Wizard </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
              </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/users">Axios</Link>
                                <a className="dropdown-item" href="/">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        <Link to="/login"><button className="btn btn-outline-success btn-sm my-2 mr-2 my-sm-0" type="button">Login</button></Link>
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0" type="button">Signup</button>
                    </div>
                </div>
            </nav>
        )
    }
}
