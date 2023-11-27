import { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Switch } from "react-router";
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/layout/auth/Login';
import Register from './components/layout/auth/Register';
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
//Redux
import { Provider } from 'react-redux';
import store from './store'


if (localStorage.token) {
    setAuthToken(localStorage.token);
}


const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Routes>
                        <Route exact path="/" Component={Landing}></Route>
                    </Routes>

                    <section className='container'>
                        <Alert />
                        <Routes>
                            <Route exact path="/register" Component={Register}></Route>
                            <Route exact path="/login" Component={Login}></Route>
                        </Routes>
                    </section>


                </Fragment>
            </Router>
        </Provider>
    )
}

export default App;
