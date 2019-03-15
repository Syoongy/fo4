const axios = require("axios");

async function getData() {
  const data = await axios.post(
    "http://fifaonline4.nexon.com/datacenter/PlayerList"
  );
  console.log(data.data);
}

// Squad builder url
//http://fifaonline4.nexon.com/DataCenter/SquadMakerPlayerList?n1Confederation=&n4LeagueId=&strSeason=&strPosition=&n4TeamId=&n4NationId=&n1Favorit=0&strOrderby=overallrating%20descending&strPlayerName=&n4OvrMin=40&n4OvrMax=150&n4SalaryMin=4&n4SalaryMax=34&rd=0.5053650015652047

getData();
