import React from 'react'
import batman from '../images/batman.png'

function ErrorPage() {

    const styles={
        titre2: {
        textAlign: 'center',
        marginTop: '50px',
        fontWeight: 'bold',
        color: 'rgb(100, 100, 100)'
        },
        image: {
            display: 'block',
            margin: '40px auto'
        }
    } 

    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style={styles.titre2} >oups, cette page n'existe pas</h2>
                <img style={styles.image} src={batman} alt="image error page"/>
            </div>
        </div>
    )
}

export default ErrorPage
