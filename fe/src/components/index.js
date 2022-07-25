import React from 'react'
import { Link } from 'react-router-dom';




export const NotFound = () => {
  return (
    <div>
    <div className="columns mt-5 is-centered">
    <h1>404 - Not Found mazseeh!</h1>
  </div>
  <div className="columns mt-1 is-centered">
    <Link to="/">Go Home</Link>
    </div>
    </div>)
}

export default NotFound;