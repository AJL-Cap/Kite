const makeRoomCode = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let codeArr = []
  for (let i = 0; i < 4; i++) {
    const j = (Math.floor(Math.random() * alphabet.length ))
    codeArr.push(alphabet[j])
  }
  return codeArr.join('')
}

export default makeRoomCode
