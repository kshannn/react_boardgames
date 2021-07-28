import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config';

export default function ProfileUpdate() {

    const history = useHistory();
    const location = useLocation();
    const [formState, setFormState] = useState({
        'username':location.state.userInfo.username,
        'email': location.state.userInfo.email,
        'address':location.state.userInfo.address,
        'phone_number':location.state.userInfo.phone_number 
    })

    let updateForm = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    let updateProfile = async () => {
        await axios.post(config.API_URL + '/users/profile/update', {
            'username':formState.username,
            'email':formState.email,
            'address':formState.address,
            'phone_number':formState.phone_number
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        history.push('/profile')

    }

    return(
        <React.Fragment>
            <h1>Update your profile</h1>
            
            <div>
                <label>Username</label>
                <input type="text" name="username" value={formState.username} onChange={updateForm}/>
            </div>

            <div>
                <label>Email</label>
                <input type="email" name="email" value={formState.email} onChange={updateForm}/>
            </div>
            <div>
                <label>Address</label>
                <input type="text" name="address" value={formState.address} onChange={updateForm}/>
            </div>
            <div>
                <label>Phone No.</label>
                <input type="text" name="phone_number" value={formState.phone_number} onChange={updateForm}/>
            </div>
            <button className="btn btn-success" onClick={updateProfile}>Confirm changes</button>
            
        </React.Fragment>
    )
}