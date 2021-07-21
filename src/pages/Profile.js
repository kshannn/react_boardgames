import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom'
import config from '../config'

export default function Profile() {

    const location = useLocation();


    let fetchProfile = async () => {
        await axios.get(config.API_URL + '/users/profile', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
    }
  
    console.log(localStorage.getItem('accessToken'))

    return (
        <React.Fragment>
            {/* can only see the page if they have the access token (logged in)*/}
            {localStorage.getItem('accessToken') && <div>
                <h1>Your Profile</h1>
                <p>Id: {location.state.id}</p>
                <p>Your email: {location.state.formState.email}</p>
                {fetchProfile}
            </div> }
            
        </React.Fragment>
    )
}