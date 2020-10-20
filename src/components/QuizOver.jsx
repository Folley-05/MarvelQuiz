import React, { useEffect, useState } from "react"
import {GiTrophyCup} from 'react-icons/gi'

const QuizOver= React.forwardRef((props, ref)=>{
    var {levelsNames, level, max, score, level }=props.state
    const { loadNextLevel }=props
    const[asked, setAsked]=useState([])
    //console.log(level)
    useEffect(()=>{
        setAsked(ref.current)
    }, [ref])
    const details=asked.map(
        detail=><tr key={detail.id}>
            <td>{detail.question}</td>
            <td>{detail.answer}</td>
            <td><button className="btnInfo">infos</button></td>
        </tr>
    )
    //score+=4
    const average=max/2
    const decision=score>=average ? (
        <>
            <div className="stepsBtnContainer">
                {
                    level<levelsNames.length ? (
                        <>
                            <p className="successMsg">felicitation, passer au niveau suivant</p>
                            <button className="btnResult successMsg" onClick={()=>loadNextLevel(level)}>niveau suivant</button>
                        </>
                    ) : (
                        <>
                            <p className="successMsg"><GiTrophyCup size={"2em"} /> bravo, vous etes un expert</p>
                            <button className="btnResult gameOver" onClick={()=>loadNextLevel(0)}>revenir a l'accueil</button>
                        </>
                    )
                }
            </div>      
        </>
    ) : (
        <>
            <p className="failureMsg">vous avez echoue</p>
            <div className="loader"></div>
        </>
    )
    
    if(score<average) {

        console.log(level)
        setTimeout(()=>{
            loadNextLevel(level-1)
        }, 5000)
    }


    return (
        <>
            {decision}
                <div className="percentage">
                    <div className="progressPercent">reusite {score*100/max}%</div>
                    <div className="progressPercent">note {`${score}/${max}`}</div>
                </div>
                <hr/>

                {
                    score>=average ? (

                
                <div className="answerContainer">
                    <table className="answers">
                        <thead>
                            <tr>
                                <th>questions</th>
                                <th>reponses</th>
                                <th>infos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                </div>
                    ) : (
                        <p style={{textAlign: "center", padding: '2%', fontSize: '1.5em'}}><span className="failureMsg">veuillez refaire ce niveau </span></p>
                    )
                }

        </>
    )
})

export default React.memo(QuizOver) 
