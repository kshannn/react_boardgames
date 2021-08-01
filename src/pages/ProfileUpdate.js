import React, { useState, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config';
import UserContext from './UserContext';

export default function ProfileUpdate() {

    const context = useContext(UserContext)
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

        try {
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
            
        } catch (err){
            // if user is not logged in, clear session data and redirect to login
            if(err.toString().includes(403)){
                // clear localStorage
                localStorage.removeItem('accessToken')
                localStorage.removeItem('decodedAccessToken')
                localStorage.removeItem('userInfo')
                // redirect user to login
                window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + 'https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/profile')
            }
        }



        

    }

    return(
        <React.Fragment>

             {/* can only see the page if they have the access token (logged in)*/}
             {localStorage.getItem('accessToken')?<React.Fragment>
            <div id="updateProfilePage">
            
                <div id="updateProfileContainer">
                    <h2>Update Profile</h2>
                    <hr></hr>
                  
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="username" value={formState.username} onChange={updateForm}/>
                
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formState.email} onChange={updateForm}/>
                
            
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formState.address} onChange={updateForm}/>
                
                    <label className="form-label">Phone No.</label>
                    <input type="text" className="form-control" name="phone_number" value={formState.phone_number} onChange={updateForm}/>
                 
                    <button className="btn btn-success my-4" onClick={updateProfile}>Save changes</button>
                    <a className="btn btn-secondary ms-2" href="/profile">Cancel</a>
                </div>
            </div>
            </React.Fragment>: <div>Please sign in to view this page.</div> }
           
            
        </React.Fragment>
    )
}