import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

const Level = (props) => {
    const{level, levelsNames}=props
    const [names, setNames]=useState([])
    useEffect(()=>{
        let namesLevels=[]
        namesLevels=levelsNames.map(name=>({title: name.toUpperCase()}))
        setNames(namesLevels)
    },[])
    return (
        <div className="levelsContainer">
                <Stepper steps={names}
                    size={50}
                    circleFontSize={20}
                    circleTop={0}
                    lineMarginOffset={0}
                    activeStep={level}
                    activeColor={"red"}
                    activeTitleColor={"red"}
                    completeColor={"red"}
                    completeTitleColor={"red"}
                    completeBarColor={"red"}
                    barStyle={"dashed"}
                 />
        </div>
    )
}

export default React.memo(Level)

//<h2 className="headingLevels">{props.level}</h2>