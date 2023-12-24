import { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/layout/auth/Login';
import Register from './components/layout/auth/Register';
import Dashboard from './components/layout/Dashboard';
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/layout/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store'
import CreateProfile from './components/layout/profile-forms/CreateProfile';
import EditProfile from './components/layout/profile-forms/EditProfile';
import AddExperience from './components/layout/profile-forms/AddExperience';
import AddEducation from './components/layout/profile-forms/AddEducation';


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
                            <Route exact path="/create-profile" Component={CreateProfile}></Route>


                            <Route path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            ></Route>

                            <Route path="/create-profile"
                                element={
                                    <PrivateRoute>
                                        <CreateProfile />
                                    </PrivateRoute>
                                }
                            ></Route>
                            <Route path="/edit-profile"
                                element={
                                    <PrivateRoute>
                                        <EditProfile />
                                    </PrivateRoute>
                                }
                            ></Route>
                            <Route path="/add-education"
                                element={
                                    <PrivateRoute>
                                        <AddEducation />
                                    </PrivateRoute>
                                }
                            ></Route>

                            <Route path="/add-experience"
                                element={
                                    <PrivateRoute>
                                        <AddExperience />
                                    </PrivateRoute>
                                }
                            ></Route>
                        </Routes>
                    </section>


                </Fragment>
            </Router>
        </Provider>
    )
}

export default App;



