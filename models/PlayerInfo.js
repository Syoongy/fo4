class PlayerInfo {
  constructor(name, positions, pay, season) {
    this.name = name;
    this.positions = positions;
    this.pay = pay;
    this.season = season;
  }

  getInfo() {
    console.log(`My name is ${this.name} with cost ${this.pay} from ${this.season}`);
    for (const currPosition of this.positions) {
      console.log(
        `I can play as a ${currPosition.position} with ${
          currPosition.rating
        } overall`
      );
    }
  }
}

module.exports = PlayerInfo;
