import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom'
import config from '../config'

export default function Profile() {

    const location = useLocation();

    // const fetchProfile = async () => {
    //     await axios.get(config.API_URL + '/users/profile')
    // }
    


    return (

        <React.Fragment>
            <h1>Your Profile</h1>
            <p>Id: {location.state.id}</p>
            <p>Your email: {location.state.formState.email}</p>
            {/* {fetchProfile()} */}
        </React.Fragment>
    )
}