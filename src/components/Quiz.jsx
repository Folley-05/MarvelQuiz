import React, { Component } from 'react'
import Level from './Level'
import ProgressBar from './ProgressBar'
import {QuizMarvel} from './Questions'

export class Quiz extends Component {

    state={
        levelsNames: ["debutant", "confirme", "expert"],
        level: 0,
        max: 10,
        storeQuestions: [],
        question: null,
        options: []

    }
    qst=null
    componentDidMount() {
        this.loadQuestions(this.state.levelsNames[this.state.level])
        
    }
        
        

   
    
    
    loadQuestions=level=>{
        const dataLevel=QuizMarvel[0].quizz[level]
        const newArray=dataLevel.map(({answer, ...rest})=>rest)
        let a=this.state
        a.storeQuestions=newArray
        a.options=newArray[a.level].options
        a.question=newArray[a.level].question
        this.setState(a)
        console.log(this.state.question)

    }

    render() {
        const {storeQuestions, question, options}=this.state
        const proposition=options.map(option=><p className="answerOptions">{option}</p>)
        const {pseudo}=this.props.userData
        return (
            <div>
                <Level />
                <ProgressBar />
                <h2>{question}</h2>
                <div className="answerContainer">
                    {proposition}
                </div>
                <button className="btnSubmit">Suivant</button>
            </div>
        )
    }
}

export default Quiz

