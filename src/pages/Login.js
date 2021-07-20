import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Login() {

    const history = useHistory()
    const [formState, setFormState] = useState({
        'email': "",
        'password': ""
    })

    function login () {
        history.push('/profile', {
            'formState': formState
        }) // push to exact path
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