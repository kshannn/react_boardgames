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
    const [ errorState, setErrorState ] = useState({
        'nameErr':"",
        'addressErr':"",
        'phoneErr':""
    })

    

    let updateForm = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    let updateProfile = async () => {

         // frontend validation
         let isError = false;
         let errMsg = {};
 
         if (formState.username === "") {
             isError = true
             errMsg['nameErr'] = "Please provide a valid name."
         }
 
         if (formState.address === "") {
             isError = true
             errMsg['addressErr'] = "Please provide your shipping address."
         }
 
         if (formState.phone_number === "") {
             isError = true
             errMsg['phoneErr'] = "Please provide a valid phone number."
         }

 
         if (isError){
             setErrorState(errMsg);
             return
         }

        try {

            
            await axios.post(config.API_URL + '/users/profile/update', {
                'username':formState.username,
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
                localStorage.removeItem('userInfo')
                // redirect user to login
                window.location.assign(config.REACT_URL + '/login?session=expire&callback_url=' + config.REACT_URL + '/profile')
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
                    {formState.username === ""? <div className="invalidMessage">{errorState.nameErr}</div> : null}        
            
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formState.address} onChange={updateForm}/>
                    {formState.address === ""? <div className="invalidMessage">{errorState.addressErr}</div> : null}
                
                    <label className="form-label">Phone No.</label>
                    <input type="text" className="form-control" name="phone_number" value={formState.phone_number} onChange={updateForm}/>
                    {formState.phone_number === ""? <div className="invalidMessage">{errorState.phoneErr}</div> : null}
                 
                    <button className="btn btn-warning my-4 me-2" onClick={updateProfile}>Save changes</button>
                    <a className="btn btn-secondary" href="/profile">Cancel</a>
                </div>
            </div>
            </React.Fragment>: <div>Please sign in to view this page.</div> }
           
            
        </React.Fragment>
    )
}