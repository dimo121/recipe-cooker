import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-inverse bg-inverse navbar-toggleable-lg">
            <a className="navbar-brand" href="/">
                <img
                    src={require('../images/PinClipart.com_soup-pot-clipart_3296698.png')}
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    alt=""
                />
                <h1 className="title">Recipe Cooker</h1>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link">
                            History
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pantry" className="nav-link">
                            Pantry
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/recipes" className="nav-link">
                            Recipes
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
