import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

import "../Styles/Nav.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  function close() {
    setExpanded(false);
  }

  const showSearchBar = () => {
    setShow(!show);
  };

  return (
    <div className="nav-div">
      <ul className="u-list">
        <li>
          <a href="https://coincap.io/">Coins</a>
        </li>
        <li>
          <a href="https://coincap.io/exchanges">Exchanges</a>
        </li>
        <li>
          <a href="https://app.shapeshift.com/#/demo/trade">Swap</a>
        </li>
      </ul>

      <a href="https://coincap.io" style={ { textDecoration: 'none' } } target="_blank" rel="noreferrer">
        <img src="https://coincap.io/static/logos/black.svg" alt="logo" />
      </a>


      <div className="nav-right" >
        <ul className="u-list">
          <li>USD</li>
          <li>English</li>
        </ul>

        <div tabIndex={ 0 } onFocus={ expand } onBlur={ close }>
          { expanded ? <input type="text" className="searchBar" /> : "" }
          <FaSearch onClick={ showSearchBar } />
        </div>

        <AiFillSetting />
        <button>
          <a href="https://atultheportfolio.netlify.app" style={ { textDecoration: 'none', color: 'white' } } target="_blank"
            rel="noreferrer">
            Connect Wallet
          </a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
