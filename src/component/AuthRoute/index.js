import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'
export default function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />
        // if (hasToken()) {
        //   return <Component {...props} />
        // } else {
        //   return <Redirect to="/login" />
        // }
      }}
    ></Route>
  )
}
