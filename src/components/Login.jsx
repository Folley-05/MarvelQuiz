import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context  } from './Context'

function Login(props) {


    
    const firebase=useContext(Context)
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState('')
    const [btn, setBtn]=useState(false)
    useEffect(()=>{
        if(password.length > 5 && email!=="")
            setBtn(true)
        else
            setBtn(false)
    }, [password, email])

    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePasword=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit=e=>{
        e.preventDefault( )
        firebase.loginUser(email, password).then(user=>{
            props.history.push('/Welcome')
            setPassword('')
            setEmail('')
        }).catch(error=>{
            setPassword('')
            setEmail('')
            setError(error)
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {error!=="" && <span>{error.message}</span>}
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="email" id="email" value={email} autoComplete="off" onChange={handleEmail} required/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" value={password} autoComplete="off" onChange={handlePasword} required/>
                                <label htmlFor="password">Mot de Password</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button> }
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signUp">nouveau sur Marvel quiz? inscrivez vous maintenant</Link>
                        </div>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/forgetpassword">mot de passe oublie?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
