import React from 'react'
import fire from '../../fire'
import {useObjectVal} from 'react-firebase-hooks/database'
import SessionPlayer from './SessionPlayers'
import {Button} from 'react-bootstrap'
import NotFound from '../NotFound'

const db = fire.database()

const WaitingRoom = props => {
  //getting that session info
  const {code} = props.match.params
  const gameSession = db.ref('gameSessions/' + code)

  const [session, loading, error] = useObjectVal(gameSession)
  if (loading) return ''
  if (error) return 'Error'
  if (!session) return <NotFound />

  //back to lobby button functionality if a user is trying to access a game they're not in.
  const handleClick = () => {
    //updating that session status to playing
    gameSession.update({status: 'playing'}, function(err) {
      //error handling
      if (err) console.log('error switching game to playing')
      else console.log('success')
      //still need send to the playing game component
      props.history.push(`/games/${code}/${session.gameId}`)
    })
  }
  //getting players from the session
  let players = Object.keys(session.players)
  return (
    <>
      {players.includes(`${props.userId}`) ? (
        <div>
          <div className="row justify-content-center">
            <h1>Waiting for more players!</h1>
            <h2
            >{`Give your friends this code to invite them to your game: ${code}`}</h2>
          </div>
          <div className="container">
            <div className="row">
              <h3 className="mx-auto">Players</h3>
            </div>
            <div className="row">
              {players.map(player => (
                <SessionPlayer player={player} key={player} />
              ))}
            </div>
            <div className="row justify-content-center">
              <Button variant="dark" onClick={handleClick}>
                Start Game
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default WaitingRoom
