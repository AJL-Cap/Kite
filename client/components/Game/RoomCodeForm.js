import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import RoomCodeSubmit from './RoomCodeSubmit'

const RoomCodeForm = (props) => {
  const { uid, history } = props
  const { register, handleSubmit, errors } = useForm()
  const [formCode, setFormCode] = useState('')

  const onSubmit = data => {
    setFormCode(data.code)
  };

  return (
    <div className="card" style={{ margin: "5%" }} >
      <div className="card-body text-primary" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="game code" name="code" ref={register({required: true, maxLength: 4})} />
          <br />
          { errors.code && <span className="alert-warning">incorrect room code</span> }
          <br />
          <button type="sumbit" className="btn btn-primary">join game</button>
          { formCode && <RoomCodeSubmit formCode={formCode} uid={uid} history={history} />}
        </form>
      </div>
    </div>
  )
}

export default RoomCodeForm
