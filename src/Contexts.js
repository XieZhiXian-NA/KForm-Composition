import React, { Component } from 'react'
const Context = React.createContext()
const store={token:"xxx"}

export default class Contexts extends Component{
   
    render(){ 
        console.log(Context.Provider)
        return (
    
            <Context.Provider value={store}>
                <div>
                    <Context.Consumer>
                        { store=> <p>{store.token}</p> }
                    </Context.Consumer>
                </div>
            </Context.Provider>
            
        )
            
        
    }
}