const axios = require('axios')

async function getData(){
  const data = await axios.post('http://fifaonline4.nexon.com/datacenter/PlayerList')
  console.log(data.data)

}

getData()
