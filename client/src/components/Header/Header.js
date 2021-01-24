import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const { user, isLoggedin } = auth;

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout');
      localStorage.removeItem('firstLogin');
      window.location.href = '/';
    } catch (error) {
      window.location.href = '/';
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="" />
          {user.name}
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transformStyle = {
    transform: isLoggedin ? 'translateY(-5px)' : 0,
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Bis</Link>
        </h1>
      </div>
      <ul style={transformStyle}>
        <li>
          <Link to="/">Cart</Link>
        </li>
        {isLoggedin ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
