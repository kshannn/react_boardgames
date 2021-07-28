import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import config from '../config'


export default function Profile() {

    const history = useHistory();
    
    const [ userInfo, setUserInfo ] = useState({})

    // 1. upon component did mount, call fetchprofile
    useEffect(() => {
        fetchProfile()
      }, [])

    // 2. user profile info is fetched from db
    let fetchProfile = async () => {
        let userInfo = await axios.get(config.API_URL + '/users/profile', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setUserInfo(userInfo.data)
        // console.log(userInfo)
    }

    let updateDetails = () => {
        history.push('/profile/update', {
            'userInfo': userInfo
        })
    }
    


    return (
        <React.Fragment>
            {/* can only see the page if they have the access token (logged in)*/}
            {localStorage.getItem('accessToken')?<div>
                <h1>Your Profile</h1>
        
                <p>Username: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
                <p>Address: {userInfo.address}</p>
                <p>Phone No.: {userInfo.phone_number}</p>
                <button className="btn btn-warning" onClick={updateDetails}>Update Details</button>
                
    
            </div>: <div>Please sign in to view this page.</div> }
            
        </React.Fragment>
    )
}