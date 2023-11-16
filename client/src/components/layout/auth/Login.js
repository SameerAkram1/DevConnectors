import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
const Login = () => {

  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const formchng = (e) => {
    const name = e.target.name;
    console.log(name);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    console.log('SUCCESS');
  
  }

  return (
    <Fragment>
      <section className="container">
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={ onSubmit}>
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

export default Login;
 