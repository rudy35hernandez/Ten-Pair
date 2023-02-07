import React from "react"


function Die(props){
    
    const styles = {
        backgroundColor: props.isHeld ? "lime" : ""
    }
    
    return (
        <div className="die" style={styles} onClick={() => props.holdDie(props.id)}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die