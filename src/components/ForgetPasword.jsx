import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context  } from './Context'

const ForgetPasword = (props) => {

    const firebase=useContext(Context)
    

    const [email, setEmail]=useState("");
    const [success, setSuccess]=useState(null)
    const [error, setError]=useState(null)

    const handleSubmit=e=>{
        e.preventDefault()
        firebase.passwordReset(email).then(()=>{
            setError(null)
            setSuccess("un mail viens de vous etre envoye")
            setEmail('')
            setTimeout(()=>{
                props.history.push('/login')
            }, 5000)
        }).catch((error)=>{
            setError(error)
            setEmail('')
        })
    }

    const disabled=email ? false : true
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftFoget"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                            {error && <span>{error.message}</span>}
                            {success && <span style={{border: "1px solid green", color: "green"}}>{success}</span>}
                        <h2>Mot de passe oublie</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="email" id="email" value={email} autoComplete="off" onChange={e=>setEmail(e.target.value)} required/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={disabled}>Recuperer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">retourner vous connecter</Link>
                        </div><br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPasword
