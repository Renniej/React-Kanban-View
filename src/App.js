import Kanban from './Kanban';
import Sidebar from './Sidebar'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import React from 'react'


export default function App() {
    return (
        <>  
            <Router>
                <Sidebar/>

                    <Switch>

                    <Route path="/projects/:projId" render={(props) => (
                            <Kanban key={props.match.params.projId} {...props} />)
                            } />


                    </Switch>

            </Router>
         </>
    )
}

