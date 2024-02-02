import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

const Login = ({ login, isAuthenticated }) => {

  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const { email, password } = LoginForm;
  const formchng = (e) => {
    setLoginForm({ ...LoginForm, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password)

  }

  //Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <Fragment>

      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={LoginForm.email}
              onChange={formchng}
            />

          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={LoginForm.password}
              onChange={formchng}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
