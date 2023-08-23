import React from 'react'
import success_img from '../assets/success_img.png'
import classes from './SuccessAlert.module.css'

const SuccessAlert = ({ showFormHandler }) => {
  return (
    <div className={classes.body}>
      <div className={classes.message}>
        <img src={success_img} alt="success_img" />
        <div>Your Email has been sent successfully!</div>
        <button onClick={showFormHandler} className={classes.btn}>
          Send another email
        </button>
      </div>
    </div>
  )
}

export default SuccessAlert
