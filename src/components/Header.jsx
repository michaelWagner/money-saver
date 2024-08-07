import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ token, logout }) => {
  return (
    <header className="header">
      <h1>Money Saver</h1>
      <nav>
        <ul>
          <li><Link to="/">Bucket</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          {token ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
