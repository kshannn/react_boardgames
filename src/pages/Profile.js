import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import config from '../config'
import UserContext from './UserContext';



export default function Profile() {

    const history = useHistory();
    const context = useContext(UserContext)
    const [userInfo, setUserInfo] = useState({})

    // 1. upon component did mount, call fetchprofile
    useEffect(() => {
        async function fetchProfile(){
            try {
                let userInfo = await axios.get(config.API_URL + '/users/profile', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                setUserInfo(userInfo.data)
                context.setName()
            } catch (err) {
                // if user is not logged in, clear session data and redirect to login
                if (err.toString().includes(403)) {
                    context.logoutRedirect();
                }
            }
        }
        fetchProfile()
    }, [context])


    let updateDetails = () => {
        history.push('/profile/update', {
            'userInfo': userInfo
        })
    }


    return (
        <React.Fragment>

            {/* can only see the page if they have the access token (logged in)*/}
            {localStorage.getItem('accessToken') ? <React.Fragment>
                <div id="profilePage">
                    <div id="profileContainer">
                        <h2>Your Profile</h2>
                        <hr></hr>
                        <p>Name: {userInfo.username}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Address: {userInfo.address}</p>
                        <p>Phone No: {userInfo.phone_number}</p>
                        <button id="updateProfileBtn" className="btn btn-warning my-3" onClick={updateDetails}>Edit</button>
                    </div>


                </div></React.Fragment> : <div>Please sign in to view this page.</div>}

        </React.Fragment>
    )
}