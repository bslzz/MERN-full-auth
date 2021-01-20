import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Bis</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Cart</Link>
        </li>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
