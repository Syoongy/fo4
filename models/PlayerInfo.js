class PlayerInfo {
  constructor(name, positions, season) {
    this.name = name
    this.positions = positions
  }

  getInfo() {
    console.log(`My name is ${this.name}`)
    for (const currPosition of this.positions) {
      console.log(`I can play as a ${currPosition.position} with ${currPosition.rating} overall`)
    }
  }
}

module.exports = PlayerInfo
