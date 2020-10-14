import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function Landing() {

    const refWolverine=useRef(null)
    const [btn, setBtn]=useState(false)
    useEffect(()=>{
        refWolverine.current.classList.add("startingImg")
        setTimeout(()=>{
            refWolverine.current.classList.remove("startingImg")
            setBtn(true)
        }, 1000)
        //console.log("je suis le useEffect")
    }, [])

    const setLeftImage=()=>{

        refWolverine.current.classList.add("leftImg")
    }
    const setRightImage=()=>{

        refWolverine.current.classList.add("rightImg")
    }
    const clearImage=()=>{
        if(refWolverine.current.classList.contains("leftImg")) 
            refWolverine.current.classList.remove("leftImg")
        else if(refWolverine.current.classList.contains("rightImg")) 
            refWolverine.current.classList.remove("rightImg")
    }

    const displayBtn=btn && (
            <>
                <div onMouseOver={setLeftImage} onMouseOut={clearImage} className="leftBox">
                    <Link to="/SignUp" className="btn-welcome">Inscription</Link>
                </div>
                <div onMouseOver={setRightImage} onMouseOut={clearImage} className="rightBox">
                    <Link to="/Login" className="btn-welcome">Connexion</Link>
                </div>
            </>
            )

    //console.log(refWolverine)
    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    )
}

export default Landing
