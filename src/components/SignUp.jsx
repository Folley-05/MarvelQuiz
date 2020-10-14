import React, { useState, useContext } from 'react'
import {Context} from './Context'
import { Link } from 'react-router-dom'

function SignUp(props) {
    const data={
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [loginData, setLoginData]=useState(data);
    const [error, setError]=useState('')
    const firebase = useContext(Context)
    console.log(firebase)


    const {pseudo, email, password, confirmPassword}=loginData

    const handleChange=(e)=>{
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        firebase.signUpUser(email, password).then(user=>{
            setLoginData({...data})
            props.history.push('/Welcome')
        }).catch(error=>{
            setError(error)
            setLoginData({...data})
        })
    }

    const btn=pseudo==='' || email===''  || password==='' || password!==confirmPassword ?
        <button disabled>Inscription</button> : <button>Inscription</button>
    const errorMsg=error!==''&&<span>{error.message}</span>
    return (

        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="text" id="pseudo" value={pseudo} autoComplete="off" onChange={handleChange} required/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input type="email" id="email" value={email} autoComplete="off" onChange={handleChange} required/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" value={password} autoComplete="off" onChange={handleChange} required/>
                                <label htmlFor="password">Mot de Password</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="confirmPassword" value={confirmPassword} autoComplete="off" onChange={handleChange} required/>
                                <label htmlFor="confirm-password">Confirmer le Mot de Password</label>
                            </div>
                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">deja inscrit ? connecte vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
