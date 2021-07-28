import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ProfileUpdate() {

    const location = useLocation();
    const [formState, setFormState] = useState({
        'username':location.state.userInfo.username,
        'email': location.state.userInfo.email,
        'address':location.state.userInfo.address,
        'phone_number':location.state.userInfo.phone_number 
    })

    return(
        <React.Fragment>
            <h1>Update your profile</h1>
            
            <div>
                <label>Username</label>
                <input type="text" name="username" value={formState.username}/>
            </div>

            <div>
                <label>Email</label>
                <input type="email" name="email" value={formState.email}/>
            </div>
            <div>
                <label>Address</label>
                <input type="text" name="address" value={formState.address}/>
            </div>
            <div>
                <label>Phone No.</label>
                <input type="text" name="phone_number" value={formState.phone_number}/>
            </div>
            <button className="btn btn-success">Confirm changes</button>
            <div>
                <button className="btn btn-danger">Delete my profile</button>
            </div>
            
        </React.Fragment>
    )
}