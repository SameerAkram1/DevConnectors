import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'


const AddExperience = ({ addExperience }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toogleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const nevigate = useNavigate();
 
    const onSubmit = e => {
        e.preventDefault();

        addExperience(formData)

        nevigate("/dashboard")
    }

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add An Experience
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>required field</small>
            <form class="form" onSubmit={onSubmit}>
                <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} required onChange={onChange} />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} required onChange={onChange} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" checked={current} value="current" onChange={e => {
                        setFormData({ ...formData, current: !current });
                        toogleDisabled(!toDateDisabled)
                    }} /> Current Job</p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience)