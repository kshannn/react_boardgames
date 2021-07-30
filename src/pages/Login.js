import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import config from "../config";
import jwt_decode from "jwt-decode";
import UserContext from './UserContext';

export default function Login() {

    let context = useContext(UserContext)

    const history = useHistory()
    const [formState, setFormState] = useState({
        'email': "",
        'password': ""
    })

    const login = async () => {
        let response = await axios.post(config.API_URL + '/users/login', {
            'email': formState.email,
            'password': formState.password
        })

        // if(!response.status === 200){
        //     // set error validation message
        // }
        

        if (response.status === 200){
            
           // decode accessToken (contains username, email, id, expiry period)
            var token = response.data.accessToken
            var decoded = jwt_decode(token);

            
            // store accessToken in local storage
            localStorage.setItem('accessToken',response.data.accessToken)
            localStorage.setItem('decodedAccessToken', JSON.stringify(decoded))

            // when user log in, recall app.js to retrieve decoded and rerun app.js
            context.setProfile(decoded);

            // if they are logging in from where token expire, they get callback to the page they were trying to access
            if (window.location.href.includes('session=expire')){
                const urlSearchParams = new URLSearchParams(window.location.search);
                const params = Object.fromEntries(urlSearchParams.entries());
                window.location.assign(params.callback_url)
            } else {
                // once user logged in, they will be directed to the home page
                history.push('/')
            }

        } 
    }

    const updateFormField = (e) => {
         setFormState({
             ...formState,
             [e.target.name]: e.target.value
         })
    }

    return (
        <React.Fragment>
            <h1>Login Page</h1>
            <div>
                <label>Email: </label>
                <input type='email' name='email' onChange={updateFormField} value={formState.email} />
            </div>

            <div>
                <label>Password: </label>
                <input type='password' name='password' onChange={updateFormField} value={formState.password}/>
            </div>

            <button onClick={login}>Login</button>

        </React.Fragment>
    )
}