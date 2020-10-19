import React, { useEffect, useState } from "react"

const QuizOver= React.forwardRef((props, ref)=>{
    var {levelsNames, level, max, score }=props.state
    const[asked, setAsked]=useState([])
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
    score=5
    level=2
    const average=max/2
    const decision=score>=average ? (
        <>
            <div className="stepsBtnContainer">
                {
                    level<levelsNames.length ? (
                        <>
                            <p className="successMsg">felicitation, passer au niveau suivant</p>
                            <button className="btnResult successMsg">niveau suivant</button>
                        </>
                    ) : (
                        <>
                            <p className="successMsg">bravo, vous etes un expert</p>
                            <button className="btnResult gameOver">revenir a l'accueil</button>
                        </>
                    )
                }
            </div>      
        </>
    ) : (
        <>
            <p className="failureMsg">vous avez echoue</p>
        </>
    )
    


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
