import { useReducer, useRef } from 'react'
import classes from './Form.module.css'

const reducer = (state, action) => {
  console.log(`Action type: ${action.type}`)
  switch (action.type) {
    case 'from':
      if (action.message === 'No message') {
        return { ...state, frommessage: '' }
      } else {
        return { ...state, frommessage: action.message }
      }
    case 'to':
      if (action.message === 'No message') {
        return { ...state, tomessage: '' }
      } else {
        return { ...state, tomessage: action.message }
      }
    case 'subject':
      if (action.message === 'No message') {
        return { ...state, subjectmessage: '' }
      } else {
        return { ...state, subjectmessage: action.message }
      }
    case 'fromTyping':
      return { ...state, frommessage: '' }
    case 'toTyping':
      return { ...state, tomessage: '' }
    case 'subjectTyping':
      return { ...state, subjectmessage: '' }
    default:
      return state
  }
}

const Form = ({ submitFormHandler, setShowErrorAlert }) => {
  const [state, dispatch] = useReducer(reducer, {
    frommessage: '',
    tomessage: '',
    subjectmessage: '',
  })

  const fromInput = useRef('')
  const toInput = useRef('')
  const subjectInput = useRef('')
  const bodyInput = useRef('')

  const checkFromInputHandler = () => {
    if (fromInput.current.value.length === 0) {
      dispatch({
        type: 'from',
        message: `* Please enter an email ID in the above field`,
      })
    } else if (!fromInput.current.value.includes('@')) {
      dispatch({ type: 'from', message: '* Please enter a valid email ID' })
    } else {
      dispatch({ type: 'from', message: 'No message' })
    }
  }

  const checkToInputHandler = () => {
    console.log(`To: ${toInput.current.value}`)
    if (toInput.current.value.length === 0) {
      dispatch({
        type: 'to',
        message: `* Please enter an email ID in the above field`,
      })
    } else if (!toInput.current.value.includes('@')) {
      dispatch({ type: 'to', message: '* Please enter a valid email ID' })
    } else {
      dispatch({ type: 'to', message: 'No message' })
    }
  }

  const checkSubjectInputHandler = () => {
    if (subjectInput.current.value.length === 0) {
      dispatch({
        type: 'subject',
        message: '* Please add a Subject to your email',
      })
    } else {
      dispatch({ type: 'subject', message: 'No message' })
    }
  }

  const checkAndSubmitFormHandler = (event) => {
    event.preventDefault()

    const from = fromInput.current.value
    const to = toInput.current.value
    const subject = subjectInput.current.value
    const body = bodyInput.current.value
    const isEmpty = from.length === 0 || to.length === 0 || subject.length === 0

    if (
      state.frommessage.length === 0 &&
      state.tomessage.length === 0 &&
      state.subjectmessage.length === 0 &&
      !isEmpty
    ) {
      submitFormHandler({ from, to, subject, body })
    } else {
      checkFromInputHandler()
      checkToInputHandler()
      checkSubjectInputHandler()
      setShowErrorAlert(true)
    }
  }

  return (
    <div className={classes.body}>
      <div className={classes.email}>
        <h1>Email</h1>
        <form
          className={classes.form}
          action="submit"
          onSubmit={checkAndSubmitFormHandler}
        >
          <label htmlFor="from">From:</label>
          <input
            onChange={() => {
              dispatch({ type: 'fromTyping', message: 'No message' })
            }}
            onBlur={checkFromInputHandler}
            type="text"
            ref={fromInput}
          />
          {state.frommessage.length !== 0 && (
            <strong>{state.frommessage}</strong>
          )}
          <label htmlFor="to">To:</label>
          <input
            onChange={() => {
              dispatch({ type: 'toTyping', message: 'No message' })
            }}
            onBlur={checkToInputHandler}
            type="text"
            ref={toInput}
          />
          {state.tomessage.length !== 0 && <strong>{state.tomessage}</strong>}
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            onChange={() => {
              dispatch({ type: 'subjectTyping', message: 'No message' })
            }}
            onBlur={checkSubjectInputHandler}
            ref={subjectInput}
          />
          {state.subjectmessage.length !== 0 && (
            <strong>{state.subjectmessage}</strong>
          )}
          <label htmlFor="body">Message:</label>
          <textarea name="body" id="body" cols="36" rows="4" ref={bodyInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Form
