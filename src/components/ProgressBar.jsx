import React from 'react'
import { act } from 'react-dom/test-utils'

const ProgressBar = (props) => {
    const {id, max}=props
    const actualQuestion=id+1
    const getWidth=()=>{
        return   actualQuestion*100/max
    }
    console.log(getWidth())
    return (
       <> 
            <div className="percentage">
                <div className="progressPercent"> {`Question ${actualQuestion}/${max}`} </div>
                <div className="progressPercent">pourcentage : {getWidth()}% </div>
            </div>
            <div className="progress-bar">
                <div className="progressBarChange" style={{width: `${getWidth()}%`, marginTop: 10}} ></div>
            </div>
        </>
    )
}

export default React.memo(ProgressBar)
