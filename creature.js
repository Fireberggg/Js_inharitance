class Creature {
  constructor({ name, attack, hitpoints }) {
    this.name = name;
    this.attack = attack;
    this.maxHitpoints = hitpoints;
    this.currentHitpoints = hitpoints;
  }

  getHitpoints() {
    return this.currentHitpoints > 0 ? this.currentHitpoints : 0;
  }
  setHitpoints(hitpoints) {
    hitpoints > this.maxHitpoints
      ? (this.currentHitpoints = this.maxHitpoints)
      : (this.currentHitpoints = hitpoints);
  }
  getTotalHitpoints() {
    return this.maxHitpoints;
  }
  setTotalHitpoints(hitpoints) {
    this.maxHitpoints = hitpoints;
  }
  getAttack() {
    return this.attack;
  }
  setAttack(attack) {
    this.attack = attack;
  }
  fight(creat) {
    if (creat.isAlive() && this.isAlive()) {
      // IF CHAMPION ATTACKED
      if (creat instanceof Champion) {
        // IF CHAMPION ATTACKED BY MONSTER
        if (this instanceof Monster) {
          if (creat.getBlockActive() === true) {
            creat.setBlockActive(false);
            this.getEnrageActive() ? this.setEnrageStatus(true) : null;
          } else {
            if (this.getEnrageActive()) {
              creat.setHitpoints(creat.getHitpoints() - this.getAttack() * 2);
              this.setEnrageStatus(true);
            } else {
              creat.setHitpoints(creat.getHitpoints() - this.getAttack());
            }
          }
          // IF CHAMPION ATTACKED BY ANOTHER CHAMPION
        } else if (this instanceof Champion) {
          if (creat.getBlockActive() === true) {
            creat.setBlockActive(false);
          } else {
            creat.setHitpoints(creat.getHitpoints() - this.getAttack());
          }
        }
        // IF MONSTER ATTACKED
      } else if (creat instanceof Monster) {
        // IF MONSTER ATTACKED BY ANOTHER MONSTER
        if (this instanceof Monster) {
          if (this.getEnrageActive()) {
            creat.setHitpoints(creat.getHitpoints() - this.getAttack() * 2);
            this.setEnrageStatus(true);
          } else {
            creat.setHitpoints(creat.getHitpoints() - this.getAttack());
          }
        }
        // IF MONSTER ATTACKED BY CHAMPION
        else if (this instanceof Champion) {
          creat.setHitpoints(creat.getHitpoints() - this.getAttack());
        }
      }

      if (!creat.isAlive()) {
        if (this instanceof Champion) {
          this.setAttack(this.getAttack() + 1);
        } else if (this instanceof Monster) {
          this.setTotalHitpoints(
            Math.floor(
              this.getTotalHitpoints() + creat.getTotalHitpoints() / 10
            )
          );
          this.setHitpoints(
            this.getHitpoints() + creat.getTotalHitpoints() / 4
          );
        }
      }
    } else {
      console.log("Dead man doesn't fight");
    }

    this.fightBack(creat);
  }

  isAlive() {
    return this.currentHitpoints > 0 ? true : false;
  }

  fightBack(creat) {
    if (Math.floor(Math.random() * 100) > 85) {
      creat.fight(this);
    }
  }
}

class Champion extends Creature {
  constructor({ name, attack, hitpoints }) {
    super({ name, attack, hitpoints });
    this.blockActive = false;
  }

  getAbout() {
    return `Сhampion ${
      this.name
    } with (${this.getHitpoints()} / ${this.getTotalHitpoints()}) hitpoints has attack = ${this.getAttack()}, has block active ? ${
      this.blockActive
    }, has ability to rest`;
  }

  getBlockActive() {
    return this.blockActive;
  }

  setBlockActive(block) {
    this.blockActive = block;
  }

  defence() {
    this.setBlockActive(true);
  }

  rest() {
    this.isAlive() ? this.setHitpoints(this.getHitpoints() + 5) : null;
  }
}

class Monster extends Creature {
  constructor({ name, attack, hitpoints }) {
    super({ name, attack, hitpoints });
    this.enrageStatus = { active: false, attacks: 0 };
  }

  getAbout() {
    return `Monster ${
      this.name
    } with (${this.getHitpoints()} / ${this.getTotalHitpoints()}) hitpoints has attack = ${this.getAttack()}, have ${
      this.enrageStatus.attacks
    } more enrage attacks`;
  }

  setEnrageActive(active) {
    this.enrageStatus.active = active;
  }

  getEnrageActive() {
    return this.enrageStatus.active;
  }

  setEnrageAttacks(attacks) {
    this.enrageStatus.attacks = attacks;
  }

  getEnrageAttacks() {
    return this.enrageStatus.attacks;
  }

  setEnrageStatus(used) {
    used ? this.enrageStatus.attacks-- : null;
    this.enrageStatus.attacks === 0 ? (this.enrageStatus.active = false) : null;
  }

  enrage() {
    this.setEnrageActive(true);
    this.setEnrageAttacks(2);
  }
}
