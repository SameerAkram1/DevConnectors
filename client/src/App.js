import { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {  Switch } from "react-router";
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/layout/auth/Login';
import Register from './components/layout/auth/Register';

const App = () => {
return (
    <Router>
        <Fragment>
            <Navbar/>
                <Routes><Route exact path="/" Component={Landing}></Route>
                </Routes>
            //section
            <section className='container'>
                <Routes>
                    <Route exact path="/register" Component={Register}></Route>
                    <Route exact path="/login" Component={Login}></Route>
                </Routes>
            </section>
            
         
        </Fragment>
    </Router> 
   )}

export default App;
 