import React, { useEffect, useState } from "react"
import {GiTrophyCup} from 'react-icons/gi'
import Modal from './Modal'

const QuizOver= React.forwardRef((props, ref)=>{
    var {levelsNames, level, max, score, level }=props.state
    const { loadNextLevel }=props
    const[asked, setAsked]=useState([])
    const[modal, openModal]=useState(false)
    //console.log(level)
    useEffect(()=>{
        setAsked(ref.current)
    }, [ref])
    const showModal=id=>{
        openModal(true)
    }
    const hideModal=()=>{
        openModal(false)
    }
    const details=asked.map(
        detail=><tr key={detail.id}>
            <td>{detail.question}</td>
            <td>{detail.answer}</td>
            <td><button className="btnInfo" onClick={()=>showModal(detail.heroId)}>infos</button></td>
        </tr>
    )
    score+=4
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
            <Modal show={modal} hideModal={hideModal}>
                <div className="modalHeader">
                    <h2>Titre</h2>
                </div>
                <div className="modalBody">
                    <h3>details</h3>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn" onClick={hideModal}>Fermer</button>
                </div>
            </Modal>

        </>
    )
})

export default React.memo(QuizOver) 
