import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul>
      <li><Link to='/dashboard'>👤 Dashboard</Link></li>
      <li>
        <li><Link to='/' onClick={logout}>🔐 Logout</Link></li>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  )

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <a><i className="fas fa-code"></i> <Link to='/dashboard'>DevConnector</Link></a>
        </h1>
        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </nav>
    </div>
  );
}







Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
