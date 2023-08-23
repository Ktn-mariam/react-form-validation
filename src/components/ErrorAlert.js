import React from 'react'
import error_img from '../assets/error_img.png'
import classes from './ErrorAlert.module.css'

const ErrorAlert = () => {
  return (
    <div className={classes.center}>
      <div id="error" className={classes.message}>
        <img src={error_img} alt="error" />
        <div>
          Your Email could not be sent! Please fill in the details correctly.
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert
