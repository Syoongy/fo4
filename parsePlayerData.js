// We are interested in the player's image, season, rating and name

const fs = require("fs");
const PlayerInfo = require("./models/PlayerInfo");

async function getData() {
  const retData = await fs.readFileSync("test.html");
  return retData.toString();
}

async function getWantedChunks(data) {
  const dataInArray = data.split("\n");
  let divCounter = 0;
  let playerInfoArray = [];
  const finalArray = [];
  for (const line of dataInArray) {
    // Gather playerInfoArray
    if (line.includes('<div class="player_info">') || divCounter > 0) {
      if (line.includes('<div class="player_info">')) divCounter++;
      // else if (line.includes('<div class="info_bottom">')) {
      //   divCounter = 0;
      //   break;
      // }
      else if (line.match(/<div [^<]*<\/div>/g)) {
      } else if (line.includes("</div>")) divCounter--;
      else if (line.includes("<div")) divCounter++;
      playerInfoArray.push(line);
    } else if (
      divCounter === 0 &&
      !line.includes('<div class="player_info">')
    ) {
      if (line.includes('<span class="pay"')) {
        pay = line.match(/(?!<span [^<]*>)[^<>]*(?=<\/span>)/g)[0];
        playerInfoArray.push(line);
      }
    } else {
      console.log('called')
      finalArray.push(playerInfoArray);
      playerInfoArray = 0;
      break;
    }
  }
  console.log(finalArray.length);
  // await getPlayerInfo(playerInfoArray);
  return dataInArray;
}

async function getPlayerInfo(playerInfoArray) {
  let name = "";
  let pay = 0;
  let season = "";
  const positions = [];
  const ratings = [];
  const finalPositions = [];
  for (const line of playerInfoArray) {
    if (line.includes('<div class="name">')) {
      name = line.match(/(?!<div [^<]*>)[^<>]*(?=<\/div>)/g)[0];
    } else if (line.includes("game/fo4/obt/externalAssets/season/")) {
      const seasonpic = line.match(/\w*.png/g)[0];
      season = seasonpic.split(".")[0];
    } else if (line.includes('<span class="txt">')) {
      positions.push(line.match(/(?!<span [^<]*>)[^<>]*(?=<\/span>)/g)[0]);
    } else if (line.includes('<span class="skillData_')) {
      ratings.push(line.match(/(?!<span [^<]*>)[^<>]*(?=<\/span>)/g)[0]);
    } else if (line.includes('<span class="pay"')) {
      pay = line.match(/(?!<span [^<]*>)[^<>]*(?=<\/span>)/g)[0];
    }
  }
  for (let i = 0; i < positions.length; i++) {
    const position = {
      position: positions[i],
      rating: ratings[i]
    };
    finalPositions.push(position);
  }
  const playerInfo = new PlayerInfo(name, finalPositions, pay, season);
  playerInfo.getInfo();
}

async function start() {
  //Retrieve the raw data
  const data = await getData();

  //Get the wanted chunks of the data
  await getWantedChunks(data);
}

start();
