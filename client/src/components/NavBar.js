import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg pl-md-5 pl-md-5 ">
      <a className="navbar-brand" href="#">
        Brownie Token Exchange
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <p className="nav-link" href="#">
              Connect wallet
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
