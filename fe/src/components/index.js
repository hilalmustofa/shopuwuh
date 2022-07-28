import React from 'react'
import { Link } from 'react-router-dom';


export const NotFound = () => {
  return (
    <div>
      <div class="container mt-4 is-mobile has-text-centered">
      <div class="column is-8-mobile is-6-tablet is-4-desktop has-text-centered">
    <img src={require("../assets/404.png")}/>
    <div className="columns mt-0 is-centered">
    <p>Page not found</p>
    </div>
  </div>
  <div className="columns mt-1 is-centered">
    <Link to="/">Go Home</Link>
    </div>
    </div>
    </div>
    )
}

export default NotFound;