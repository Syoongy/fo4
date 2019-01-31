// We are interested in the player's image, season, rating and name

const fs = require('fs')
const PlayerInfo = require('./models/PlayerInfo')

async function getData() {
  const retData = await fs.readFileSync('test.html')
  return retData.toString()
}

async function getWantedChunks(data) {
  const dataInArray = data.split('\n')
  let divCounter = 0
  const playerInfoArray = []
  for (const line of dataInArray) {
    // Gather playerInfoArray
    if (line.includes('<div class="player_info">') || divCounter > 0) {
      if (line.includes('<div class="player_info">')) divCounter++
      else if (line.includes('<div class="info_bottom">')) {
        divCounter = 0
        break
      } else if (line.match(/<div [^<]*<\/div>/g)) {}
      else if (line.includes('</div>')) divCounter--
      else if (line.includes('<div')) divCounter++
      playerInfoArray.push(line)
    }
  }
  await getPlayerInfo(playerInfoArray)
  return dataInArray
}

async function getPlayerInfo(playerInfoArray) {
  let name = ''
  const positions = []
  const ratings = []
  const finalPositions = []
  for (const line of playerInfoArray) {
    if (line.includes('<div class="name">')) {
      name = line.match(/(?!<div [^<]*>)[^<>]*(?=<\/div>)/g)[0]
    } else if (line.includes('<span class="txt">')) {
      positions.push(line.match(/(?!<span [^<]*>)[^<>]*(?=<\/span>)/g)[0])
    } else if (line.includes('<span class="skillData_')) {
      ratings.push(line.match(/(?!<span [^<]*>)[^<>]*(?=<\/span>)/g)[0])
    }
  }
  for (let i = 0; i < positions.length; i++) {
    const position = {
      position: positions[i],
      rating: ratings[i]
    }
    finalPositions.push(position)
  }
  const playerInfo = new PlayerInfo(name, finalPositions)
  playerInfo.getInfo()
}

async function start() {
  //Retrieve the raw data
  const data = await getData()

  //Get the wanted chunks of the data
  const parsedChunk = await getWantedChunks(data)

}

start()
