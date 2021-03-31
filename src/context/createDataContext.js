// createDataContext.js 
// lower case first character usually indicates that exports a plane function   

import React, { useReducer } from 'react'

// this function will create automatically a data Context -
// reausable function we can use many time from the application 
// to automate the process of setting up the Context and the provicer
export default (reducer, actions, initialState) => {
    const Context = React.createContext()

    const Provider = ({ children }) => {

        const [state, dispatch] = useReducer(reducer, initialState)

        // loop through action object for every key take thath function and call it
        //  with the dispatch argument and that is going to give us the 
        // fucntion that we need to pass down to value prop 
        const boundActions = {}
        for (let key in actions) {
            // key === 'addBlogPost'
            boundActions[key] = actions[key](dispatch)
        }

        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider }
}