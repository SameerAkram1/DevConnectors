import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
const Register = () => {


const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  password2: ""
})
 

const {name, email, password, password2} = formData;

const onChng = (e) =>{
  setFormData({...formData, [e.target.name] : e.target.value});
}

const onSubmit = (e) =>{
  e.preventDefault();

  if(password !== password2){
    console.log('Passwords do not match');
  }else{
    console.log(formData);
  }
}

return (
    <Fragment>
    <section className="container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit={ onSubmit}>

        <div className="form-group">
          <input type="text" 
          placeholder="Name" 
          name="name" 
          required onChange={onChng}
          value={formData.name}/>
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"  onChange={onChng} value={formData.email} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={formData.password}
            onChange={onChng}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={formData.password2}
            onChange={onChng}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register"  />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
    </Fragment>
  );
}
export default Register;

