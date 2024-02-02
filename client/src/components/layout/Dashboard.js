import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {

    useEffect(
        () => {
            getCurrentProfile();
        }, [getCurrentProfile]
    )

    return (loading && profile === null ? (<iframe src="https://giphy.com/embed/PUYgk3wpNk0WA" width="100%" height="100%" frameBorder="0" ></iframe>)

        : <Fragment> <h1 className='larege text-primary'>Dashboard</h1>
            <p className='lead'>🙎🏻‍♂️ - Welcom  {user && user.name}</p>

            {profile == null ? <Fragment><p>You have not setup a profile, Add your information</p>
                <Link to='/create-profile' className='btn btn-primary my-1' >Create profile</Link>
            </Fragment> : <Fragment> <DashboardActions />

                <Experience experience={profile.experience} />
                <Education education={profile.education} />

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>Delete My Account</button>
                </div>


            </Fragment>}



        </Fragment>)

}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);