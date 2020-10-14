import React, { useState, useEffect, useContext } from 'react'
import { Context  } from './Context'

function Logout() {

    const firebase=useContext(Context)
    const [checked, setChecked]=useState(false)
    useEffect(()=>{
        if(checked) 
            firebase.signOutUser()
    }, [checked])

    const handleChange=e=>{
        setChecked(e.target.checked)
    }
    return (
        <div className="logoutContainer">
            <label htmlFor="check" className="switch">
                <input id="check" type="checkbox" checked={checked} onChange={handleChange} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout

