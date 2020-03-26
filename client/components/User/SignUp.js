import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import fire from '../../fire'

export default function SignUp(props) {
  const {register, handleSubmit, errors} = useForm()

  const [signupErr, setSignupErr] = useState(null)

  const [image, setImage] = useState(null)

  const handleImage = evt => {
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(evt.target.files[0])
  }

  const onSubmit = data => {
    fire
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(promise => {
        fire
          .database()
          .ref(`players/${promise.user.uid}`)
          .set({
            nickname: data.nickname,
            totalGamesPlayed: 0,
            totalPoints: 0,
            wins: 0,
            profilePic: image
          })
        props.history.push('/')
      })
      .catch(err => {
        setSignupErr(err.message)
      })
  }

  if (signupErr) return <h1>{signupErr}</h1>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        ref={register({required: true, pattern: /^\S+@\S+$/i})}
      />
      {errors.email && <p>This field is required</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        ref={register({required: true, minLength: 6})}
      />
      {errors.password && <p>Must be at least 6 characters long</p>}

      <label htmlFor="nickname">Nickname</label>
      <input
        type="text"
        placeholder="Ex: Game lover"
        name="nickname"
        ref={register({required: true, minLength: 3})}
      />
      {errors.nickname && <p>Must be at least 3 characters long</p>}

      <label htmlFor="profilePic">Profile Picture</label>
      <input
        type="file"
        placeholder="upload a picture"
        name="profilePic"
        ref={register}
        onChange={handleImage}
      />
      <input type="submit" />
    </form>
  )
}
