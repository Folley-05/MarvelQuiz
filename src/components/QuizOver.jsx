import React, { useEffect, useState } from "react"
import Axios from 'axios'
import {GiTrophyCup} from 'react-icons/gi'
import Modal from './Modal'

const QuizOver= React.forwardRef((props, ref)=>{
    var {levelsNames, level, max, score, level }=props.state
    const key=process.env.REACT_APP_MARVEL_KEY
    const hash="9c93231bdf1c2c6c77adab59927bb13f"
    const { loadNextLevel }=props
    const[asked, setAsked]=useState([])
    const[modal, openModal]=useState(false)
    const[data, setData]=useState([])
    const[loader, setLoader]=useState(true)
    useEffect(()=>{
            setAsked(ref.current)
            checkDate()
    },[ref])

    const checkDate=()=>{
        if(localStorage.getItem('dataDate')) {
            const prevDate=localStorage.getItem('dataDate')
            const nowDate=Date.now()
            const diff=nowDate-prevDate
            if(diff/(1000*3600*24)>=15)
            localStorage.clear()
        }
    }
    const showModal=id=>{
        openModal(true)
        getData(id)
    }
    const getData=id=>{
        if(localStorage.getItem(id)) {
            let localData=JSON.parse(localStorage.getItem(id))
            setData(localData)
            setLoader(false)
        } else {
            Axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${key}&hash=${hash}`).then(
                response=>{
                    localStorage.setItem(id, JSON.stringify(response.data))
                    localStorage.setItem('dataDate', Date.now())
                    setLoader(false)
                }
                ).catch(error=>console.log(error)
            )
        }
    }
    const hideModal=()=>{
        openModal(false)
        setLoader(true)
    }
    const details=asked.map(
        detail=><tr key={detail.id}>
            <td>{detail.question}</td>
            <td>{detail.answer}</td>
            <td><button className="btnInfo" onClick={()=>showModal(detail.heroId)}>infos</button></td>
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

        setTimeout(()=>{
            loadNextLevel(level-1)
        }, 5000)
    }

    const modalData=!loader ? (
       <> <div className="modalHeader">
            <h2>{data.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
            <div className="comicImage">
                <img src={data.data.results[0].thumbnail.path+'.'+data.data.results[0].thumbnail.extension} alt=""/>
                <p>{data.attributionText}<br/> {data.copyright} </p>
            </div>
            <div className="comicDetails">
                <h3>description</h3>
                <p>{data.data.results[0].description ? data.data.results[0].description : "description indisponible"}</p>
                <h3>plus d'infos</h3>
                {
                    data.data.results[0].urls &&
                    data.data.results[0].urls.map((url, i)=>{
                        return <a keu={i} href={url.url} target="_blank">{url.type}</a>
                    })
                }
            </div>
        </div>
        <div className="modalFooter">
            <button className="modalBtn" onClick={hideModal}>Fermer</button>
        </div> </>
    ) : (
        <><div className="modalHeader" onClick={hideModal}>
            <h2>Recuperation des donnees ...</h2>
        </div>
        <div className="modalBody">
            <div className="loader"></div>
        </div></>
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
            <Modal show={modal} hideModal={hideModal}>
                {modalData}
            </Modal>

        </>
    )
})

export default React.memo(QuizOver) 
