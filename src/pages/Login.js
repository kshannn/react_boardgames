import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import config from "../config";
import jwt_decode from "jwt-decode";

export default function Login() {

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
        console.log(response.data)

        // if(!response.status === 200){
        //     // set error validation message
        // }
        

        if (response.status === 200){
            
           // decode accessToken (contains username, email, id, expiry period)
            var token = response.data.accessToken
            var decoded = jwt_decode(token);
            
            // store accessToken in local storage
            localStorage.setItem('accessToken',response.data.accessToken)

            history.push('/profile', {
                'formState': formState,
                'id': decoded.id
            }) 
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