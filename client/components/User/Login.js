import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import fire from '../../fire'

export default function Login(props) {
  const {register, handleSubmit} = useForm()

  const [loginErr, setLoginErr] = useState(null)

  const onSubmit = data => {
    fire
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => props.history.push('/'))
      .catch(err => {
        setLoginErr(err.message)
      })
  }

  if (loginErr) return <h1>{loginErr}</h1>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Log In</h1>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={register} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        ref={register({required: true, minLength: 6})}
      />
      <input type="submit" />
    </form>
  )
}
