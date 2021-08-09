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
    const [errorState, setErrorState] = useState({
        'nameErr': "",
        'emailErr': "",
        'emailTakenErr': "",
        'passwordErr': "",
        'addressErr': "",
        'phoneErr': ""
    })

    async function register() {
        // frontend validation
        let isError = false;
        let errMsg = {};

        if (formState.username === "") {
            isError = true
            errMsg['nameErr'] = "Please provide a valid name."
        }

        if (formState.email === "") {
            isError = true
            errMsg['emailErr'] = "Please provide a valid email."
        }

        if (formState.password === "") {
            isError = true
            errMsg['passwordErr'] = "Please fill in your password."
        }

        if (formState.address === "") {
            isError = true
            errMsg['addressErr'] = "Please provide your shipping address."
        }

        if (formState.phone_number === "") {
            isError = true
            errMsg['phoneErr'] = "Please provide a valid phone number."
        }



        if (isError) {
            setErrorState(errMsg);
            return
        }


        try {

            await axios.post(config.API_URL + '/users/create', {
                'username': formState.username,
                'email': formState.email,
                'password': formState.password,
                'address': formState.address,
                'phone_number': formState.phone_number
            })

            history.push('/login')

        } catch (e) {
            if (e.response.status === 400) {
                errMsg['emailTakenErr'] = "Email taken. Please choose another email."
                setErrorState(errMsg);
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
            <div id="registrationHeroImage">
                <div id="registerPage">
                    <div id="registerContainer">
                        <h2>Account Registration</h2>
                        <hr></hr>


                        <label className="form-label">Name </label>
                        <input type='text' className="form-control" name='username' placeholder="e.g. Claire" onChange={updateFormField} value={formState.username} />
                        {formState.username === "" ? <div className="invalidMessage">{errorState.nameErr}</div> : null}

                        <label className="form-label">Email </label>
                        <input type='email' className="form-control" name='email' placeholder="e.g. claire@gmail.com" onChange={updateFormField} value={formState.email} />
                        {formState.email === "" ? <div className="invalidMessage">{errorState.emailErr}</div> : null}
                        {<div className="invalidMessage">{errorState.emailTakenErr}</div>}


                        <label className="form-label">Password </label>
                        <input type='password' className="form-control" name='password' placeholder="**********" onChange={updateFormField} value={formState.password} />
                        {formState.password === "" ? <div className="invalidMessage">{errorState.passwordErr}</div> : null}

                        <label className="form-label">Shipping Address </label>
                        <input type='text' className="form-control" name='address' placeholder="e.g. Blk 204C Punggol Field, #02-345, Singapore 823204" onChange={updateFormField} value={formState.address} />
                        {formState.address === "" ? <div className="invalidMessage">{errorState.addressErr}</div> : null}

                        <label className="form-label">Phone Number </label>
                        <input type='text' className="form-control" name='phone_number' placeholder="e.g. 98765432" onChange={updateFormField} value={formState.phone_number} />
                        {formState.phone_number === "" ? <div className="invalidMessage">{errorState.phoneErr}</div> : null}

                        <button id="registerBtn" className="btn my-3" onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}