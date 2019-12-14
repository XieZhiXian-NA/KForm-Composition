import React, { Component } from 'react'

function withStage(Com){
    const NewComponent = props =>{
        return <Com {...props} stage="react"/>
    }
    return NewComponent
}
function withLog(Com){
console.log(Com.name+'组件被加强了')
    return props=>{
        return <Com {...props}></Com>
    }
}

@withLog
@withStage
@withLog
class Kaikeba extends Component{
    render(){
       return (
        <div>
            {this.props.stage}-{this.props.name}
        </div>
    )
    }
}


export default Kaikeba
 