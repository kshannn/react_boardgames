import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Profile() {

    const location = useLocation();

    return (


        <React.Fragment>
            <h1>Your Profile</h1>
            <p>Your email: {location.state.formState.email}</p>
        </React.Fragment>
    )
}