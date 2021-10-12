import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// const ProtectedRoute = ({component: Component, ...props}) => {
//     return(
//       <Route>
//           {() =>
//           props.loggedIn ? <Component {...props}/> : <Redirect to='./signin'/>}
//       </Route>
//     )
// }
const ProtectedRoute = ({component: Component, ...props}) => {
    return(
        <Route>
            { props.isChecking ? (
                <main className={"content"}></main>
            ) : (
                props.loggedIn ? <Component {...props}/> : <Redirect to='./signin'/>
            )}

        </Route>
    )
}

export default ProtectedRoute;