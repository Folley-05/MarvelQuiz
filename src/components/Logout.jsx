import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
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
                <a data-tip data-for='deconnexion'> <span className="slider round"></span></a>
                <ReactTooltip id='deconnexion' type='error'>
                    <span>se deconnecter</span>
                </ReactTooltip>
            </label>
        </div>
    )
}

export default Logout

