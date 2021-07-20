import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import config from "../config";

export default function Register() {

    const history = useHistory();
    const [formState, setFormState] = useState({
        'username': "",
        'email': "",
        'password': "",
        'address': "",
        'phone_number': ""
    })

    async function register () {
        await axios.post(config.API_URL + '/users/create', {
            'username': formState.username,
            'email': formState.email,
            'password': formState.password,
            'address': formState.address,
            'phone_number': formState.phone_number
        })
        
        history.push('/login')
    }

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <React.Fragment>
            <h1>Account Registration</h1>
            <div>
                <label>Username: </label>
                <input type='text' name='username' onChange={updateFormField} value={formState.username} />
            </div>
            <div>
                <label>Email: </label>
                <input type='email' name='email' onChange={updateFormField} value={formState.email} />
            </div>

            <div>
                <label>Password: </label>
                <input type='password' name='password' onChange={updateFormField} value={formState.password}/>
            </div>
            <div>
                <label>Address: </label>
                <input type='text' name='address' onChange={updateFormField} value={formState.address}/>
            </div>
            <div>
                <label>Phone Number: </label>
                <input type='text' name='phone_number' onChange={updateFormField} value={formState.phone_number}/>
            </div>

            <button onClick={register}>Register</button>
        </React.Fragment>
    )
}