/*let heracles = new Champion({ name: "Heracles", attack: 10, hitpoints: 50 });
let boar = new Monster({ name: "Erymanthian Boar", attack: 5, hitpoints: 100 });

heracles.fight(boar);
console.log(boar.getHitpoints()); // -> 90
boar.enrage();
heracles.fight(boar);
console.log(boar.getHitpoints()); // -> 80
boar.fight(heracles);
console.log(heracles.getHitpoints()); // -> 40
for (i = 0; i < 8; i++) {
  heracles.fight(boar);
}
console.log(boar.isAlive()); // -> false
console.log(heracles.getAttack()); // -> 11
console.log(heracles.getHitpoints()); // -> 10
heracles.rest();
console.log(heracles.getHitpoints()); // -> 15
*/

let heroes = [];
let index = 0;

let myBtn = document.querySelector(".hero-item");

function callEventListeners() {
  document.addEventListener("DOMContentLoaded", loadHeroes);
  document.querySelector(".form").addEventListener("submit", submitForm);
  document
    .querySelector(".hero-container")
    .addEventListener("click", activityHero);
}

callEventListeners();

function loadHeroes(e) {
  createHero("Heracles", "Champion");
  createHero("Boar", "Monster");
}

function submitForm(e) {
  e.preventDefault();
  let name = document.querySelector(".getName").value;
  let type = document.querySelector(".getType").value;
  createHero(name, type);
  document.querySelector(".btn").setAttribute("disabled", "disabled");
}

function createHero(name, type) {
  let hero;
  if (type === "Champion") {
    hero = new Champion({ name, attack: 10, hitpoints: 50 });
  } else {
    hero = new Monster({ name, attack: 5, hitpoints: 100 });
  }
  let heroItem = document.createElement("div");
  heroItem.setAttribute("class", "hero-item");
  heroItem.innerHTML = `
  <div class="hero-describe">
        ${hero.getAbout()}
      </div>
      <div class="attack-form">
      <div class="btn-attack btn-ability">Attack hero (select in top of table)</div>
      </div>
      ${
        hero instanceof Champion
          ? `
        <div class="hero-rest btn-ability">Rest (+5 hp)</div>
        <div class="hero-defence btn-ability">Defence(block next attack)</div>`
          : `<div class="hero-enrage btn-ability">Enrage (double up damage for 2 attacks)</div>`
      }
      <div class="hero-alive ${
        hero.isAlive() ? "success" : "fail"
      }">Hero alive ? ${hero.isAlive()}</div>
      </div>
      `;
  heroes[index] = hero;
  index++;
  document.querySelector(".hero-container").appendChild(heroItem);
}

function activityHero(e) {
  e.preventDefault();
  let activeHero = 0;
  Array.from(document.querySelector(".hero-container").children).map(
    (item, index) => {
      if (e.target.classList.contains("btn-attack")) {
        if (item === e.target.parentElement.parentElement) {
          activeHero = index;
        }
      } else {
        if (item === e.target.parentElement) {
          activeHero = index;
        }
      }
    }
  );
  if (e.target.classList.contains("btn-attack")) {
    let target = document.querySelector(".selectTarget").value;
    if (target === "boar") {
      activeHero === 1
        ? console.log("Can't attack himself")
        : heroes[activeHero].fight(heroes[1]);
    } else if (target === "heracles") {
      activeHero === 0
        ? console.log("Can't attack himself")
        : heroes[activeHero].fight(heroes[0]);
    } else {
      activeHero === 2
        ? console.log("Can't attack himself")
        : heroes[activeHero].fight(heroes[2]);
    }
  } else if (e.target.classList.contains("hero-rest")) {
    heroes[activeHero].rest();
  } else if (e.target.classList.contains("hero-defence")) {
    heroes[activeHero].defence();
  } else if (e.target.classList.contains("hero-enrage")) {
    heroes[activeHero].enrage();
  }
  rerender();
}

function rerender() {
  Array.from(document.querySelector(".hero-container").children).map(
    (item, index) => {
      item.innerHTML = `
    <div class="hero-describe">
          ${heroes[index].getAbout()}
        </div>
        <div class="attack-form">
          <div class="btn-attack btn-ability">Attack hero (select in top of table)</div>
        </div>
        ${
          heroes[index] instanceof Champion
            ? `
          <div class="hero-rest btn-ability">Rest (+5 hp)</div>
          <div class="hero-defence btn-ability">Defence(block next attack)</div>`
            : `<div class="hero-enrage btn-ability">Enrage (double up damage for 2 attacks)</div>`
        }
        <div class="hero-alive ${
          heroes[index].isAlive() ? "success" : "fail"
        }">Hero alive ? ${heroes[index].isAlive()}</div>
        </div>`;
    }
  );
}
