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
    const [errorState, setErrorState] = useState({
        'emailErr': "",
        'passwordErr': "",
        'authErr': ""
    })


    const login = async () => {
        // if user is logged in and tries to log in with another acct, log out first acct
        // clear localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userInfo')


        // frontend validation
        let isError = false;
        let errMsg = {};

        if (formState.email === "") {
            isError = true
            errMsg['emailErr'] = "Please provide a valid email."
        }

        if (formState.password === "") {
            isError = true
            errMsg['passwordErr'] = "Please fill in your password."
        }

        if (isError) {
            setErrorState(errMsg);
            return
        }

        try {
            let response = await axios.post(config.API_URL + '/users/login', {
                'email': formState.email,
                'password': formState.password
            })


            if (response.status === 200) {

                // decode accessToken (contains username, email, id, expiry period)
                var token = response.data.accessToken
                var decoded = jwt_decode(token);


                // store accessToken in local storage
                localStorage.setItem('accessToken', response.data.accessToken)


                // when user log in, recall app.js to retrieve decoded and rerun app.js
                context.setProfile(decoded);

                // if they are logging in from where token expire, they get callback to the page they were trying to access
                if (window.location.href.includes('session=expire')) {
                    const urlSearchParams = new URLSearchParams(window.location.search);
                    const params = Object.fromEntries(urlSearchParams.entries());
                    window.location.assign(params.callback_url)
                } else {
                    // once user logged in, they will be directed to the home page
                    history.push('/')
                }

            }
        } catch (e) {
            console.log(e.response)
            if (e.response.status === 401) {
                errMsg['authErr'] = "Error in authentication details. Please try again."
                setErrorState(errMsg)
            }
        }


    }

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const renderFlashMessage = () => {
        if (window.location.href.includes('session=expire')) {
            return (
                <React.Fragment>
                    <div class="alert alert-warning" role="alert">
                        Please log in to continue.
                    </div>
                </React.Fragment>
            )
        } else if (window.location.href.includes('loggedout=true')) {
            return (
                <React.Fragment>
                    <div class="alert alert-success" role="alert">
                        You have logged out successfully. See you!
                    </div>
                </React.Fragment>
            )
        } else {
            return null
        }
    }

    return (
        <React.Fragment>
            {renderFlashMessage()}
            <div id="heroImage">
                <div id="loginPage">
                    <section id="loginExtraSection">
                        <div id="aboutUsContainer">
                            <h1>GameOn!</h1>
                            <p>Haven't gotten your GAME on? Fret not! We've got you covered here on GameOn! where we have a large collection of boardgames for you to choose from! </p>
                        </div>
                    </section>
                    <section id="loginFormSection">
                        <div id="loginContainer">
                            <h1>Login</h1>
                            {errorState.authErr ? <div className="alert alert-danger">{errorState.authErr}</div> : null}

                            <label className="form-label my-2">Email</label>
                            <input type='email' className="form-control" name='email' placeholder="e.g. claire@gmail.com" onChange={updateFormField} value={formState.email} />
                            {formState.email === "" ? <div className="invalidMessage">{errorState.emailErr}</div> : null}

                            <label className="form-label my-2">Password</label>
                            <input type='password' className="form-control" name='password' placeholder="**********" onChange={updateFormField} value={formState.password} />
                            {formState.password === "" ? <div className="invalidMessage">{errorState.passwordErr}</div> : null}

                            <button id="loginBtn" className="btn my-4" onClick={login}>LOGIN</button>

                            <a href="/register">Create an account</a>
                        </div>
                    </section>

                </div>
            </div>



        </React.Fragment>
    )
}