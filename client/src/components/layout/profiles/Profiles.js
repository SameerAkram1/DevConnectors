import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../../actions/profile'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();

    }, [getProfiles]);
    
    return (
        <Fragment>{loading ? (<iframe src="https://giphy.com/embed/PUYgk3wpNk0WA" width="100%" height="100%" frameBorder="0" ></iframe>) :

            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'>Browse and connect with developers</i>
                </p>

                <div className="profiles">

                    {profiles.length > 0 ? (
                        profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
                    ) : <h4>No Profile Found...</h4>}
                </div>
            </Fragment>}</Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)