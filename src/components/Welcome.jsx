import React, { useState, useContext, useEffect } from 'react'
import Logout from './Logout'
import Quiz from './Quiz'
import { Context  } from './Context'

function Welcome(props) {

    const firebase=useContext(Context)
    const [userSession, setUserSession]=useState(null)
    useEffect(()=>{
        let listener=firebase.auth.onAuthStateChanged(user=>{
            user ? setUserSession(user) : props.history.push('/')
            return ()=>{
                listener()
            }
        })
    },[])

    return userSession===null ? (
                <><div className="loader"></div><p>Loading... </p></>
            ) : (
                <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz />
            </div>
        </div>
            )

    
}

export default Welcome
