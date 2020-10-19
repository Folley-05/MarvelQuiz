import React, { Component } from 'react'
import Level from './Level'
import ProgressBar from './ProgressBar'
import {QuizMarvel} from './Questions'
import { toast } from 'react-toastify';
import QuizOver from './QuizOver'


import 'react-toastify/dist/ReactToastify.min.css';

toast.configure()

export class Quiz extends Component {

    state={
        levelsNames: ["debutant", "confirme", "expert"],
        level: 0,
        max: 10,
        storeQuestions: [],
        question: null,
        options: [],
        idQuestion: 8,
        disabled: 1,
        userAnswer: null,
        score: 0,
        gameOver: false

    }
    goodAnswer=null
    data=React.createRef()
    qst=null
    componentDidMount() {
        this.loadQuestions(this.state.levelsNames[this.state.level])
        this.showToast(this.props.userData.pseudo)
        
    }
    showToast=pseudo=>{
        toast.info(`bienvenu a toi ${pseudo}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    showToastSuccess=()=>{
        toast.success('felicitation', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName : "toastify-color", 
            progress: undefined,
            });
    }
    showToastError=()=>{
        toast.error("rate c'est dommage", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    loadQuestions=level=>{
        
        const dataLevel=QuizMarvel[0].quizz[level]
        const newArray=dataLevel.map(({answer, ...rest})=>rest)
        this.data.current=dataLevel
        this.goodAnswer=dataLevel[this.state.idQuestion].answer
        let a=this.state
        a.storeQuestions=newArray
        a.options=newArray[a.idQuestion].options
        a.question=newArray[a.idQuestion].question
        this.setState(a)
    }
    submitAnswers=option=>{
        this.setState({
            disabled: 0,
            userAnswer: option
        })

    }
    nextQuestion=()=>{
        // on verifie si on peut passer un niveau ou incrementer l'id de la question
        if(this.state.userAnswer===this.goodAnswer) {
            let a=this.state
            a.score+=1
            this.setState(a)
            this.showToastSuccess()
        }
        else {
            this.showToastError()
        }

        if(this.state.idQuestion==9) {
            
            this.gameOver()
        }
        else {
            let a=this.state
            a.idQuestion+=1
            this.setState(a)
            this.loadQuestions(this.state.levelsNames[this.state.level])
        }
        
    }
    gameOver=()=>{
        let a=this.state
        a.gameOver=true
        this.setState(a)
    }

    render() {
        
        const {storeQuestions, question, options}=this.state
        const proposition=options.map(
                    (option, index)=>
                    <p key={index} className={`answerOptions ${option===this.state.userAnswer? "selected" : null}`} onClick={()=>{this.submitAnswers(option)}}>{option}</p>
                    )

        const {pseudo}=this.props.userData
        if(!this.state.gameOver) {
            return (
                <div>
                    <Level />
                    <ProgressBar id={this.state.idQuestion} max={this.state.max} />
                    <h2>{question}</h2>
                    <div className="answerContainer">
                        {proposition}
                    </div>
                    {this.state.idQuestion<this.state.max-1 ? (
                        <button className="btnSubmit" disabled={this.state.disabled} onClick={this.nextQuestion} >Suivant</button>
                    
                    ) : (
                        <button className="btnSubmit" disabled={this.state.disabled} onClick={this.nextQuestion} >Terminer</button>
                    
                    )
                    
                }
                    
                </div>
            )
        }
        else {
            return(
                <div className="">
                    <QuizOver ref={this.data} state={this.state} />
                </div>
            )
        }
    }
}

export default Quiz

