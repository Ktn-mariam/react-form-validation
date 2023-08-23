import Form from './components/Form'
import ErrorAlert from './components/ErrorAlert'
import SuccessAlert from './components/SuccessAlert'
import React, { useState } from 'react'

function App() {
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const submitFormHandler = (emailInput) => {
    const email = {
      from: emailInput.from,
      to: emailInput.to,
      Subject: emailInput.subject,
      Body: emailInput.body,
    }

    console.log(email)

    fetch('https://632c5f1d1aabd837399a9531.mockapi.io/api/v1/mailBox', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(email),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })

    setShowSuccessAlert(true)
    setShowErrorAlert(false)
  }

  const showFormHandler = () => {
    setShowSuccessAlert(false)
  }

  return (
    <div className="App">
      {showErrorAlert && <ErrorAlert />}
      {!showSuccessAlert && (
        <Form
          submitFormHandler={submitFormHandler}
          setShowErrorAlert={setShowErrorAlert}
        />
      )}
      {showSuccessAlert && <SuccessAlert showFormHandler={showFormHandler} />}
    </div>
  )
}

export default App
