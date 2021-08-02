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
            <div id="registrationHeroImage">
                <div id="registerPage">
                    <div id="registerContainer">
                        <h2>Account Registration</h2>
                        <hr></hr>

                        <div>
                            <label className="form-label">Name </label>
                            <input type='text' className="form-control" name='username' placeholder="e.g. Claire" onChange={updateFormField} value={formState.username} />
                        </div>
                        <div>
                            <label className="form-label">Email </label>
                            <input type='email' className="form-control" name='email' placeholder="e.g. claire@gmail.com" onChange={updateFormField} value={formState.email} />
                        </div>

                        <div>
                            <label className="form-label">Password </label>
                            <input type='password' className="form-control" name='password' placeholder="**********" onChange={updateFormField} value={formState.password}/>
                        </div>
                        <div>
                            <label className="form-label">Address </label>
                            <input type='text' className="form-control" name='address'  placeholder="e.g. Blk 204C Punggol Field, #02-345, Singapore 823204" onChange={updateFormField} value={formState.address}/>
                        </div>
                        <div>
                            <label className="form-label">Phone Number </label>
                            <input type='text' className="form-control" name='phone_number' placeholder="e.g. 98765432" onChange={updateFormField} value={formState.phone_number}/>
                        </div>

                        <button id="registerBtn" className="btn my-3" onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}