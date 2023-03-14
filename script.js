const pictures = {
  "": "",
  "Luke Skywalker": "/img/luke-skywalker.png",
  "C-3PO": "/img/c-3po.png",
  "R2-D2": "/img/r2-d2.png",
  "Darth Vader": "/img/darth-vader.png",
  "Leia Organa": "/img/princess-leia.png",
  "Obi-Wan Kenobi": "/img/obi-wan-kenobi.png",
};

class Character {
  constructor({
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    pictureUrl,
    films,
  }) {
    this.name = name;
    this.gender = gender;
    this.height = Number(height);
    this.mass = mass;
    this.hair_color = hair_color;
    this.skin_color = skin_color;
    this.eye_color = eye_color;
    this.pictureUrl = pictures[name];
    this.films = films.length;
  }

  info() {
    return `
  Kön: ${this.gender}
  Längd: ${this.height}
  Vikt: ${this.mass}
  Hårfärg: ${this.hair_color}
  Hudfärg: ${this.skin_color}
  Ögonfärg: ${this.eye_color}
  Antal Filmer: ${this.films}`;
  }
}

let selectedCharacter = null;
let selectedCharacter2 = null;

async function getData(characterId) {
  let characterData = await fetch(
    `https://swapi.dev/api/people/${characterId}`
  );
  let json = await characterData.json();

  const filmResult = await Promise.all(
    films.map((apiUrl) => fetch(apiUrl).then(async (r) => await r.json))
  );

  return json;
}

document
  .getElementById("show-character-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const selectValue = document.getElementById("character-value").value;
    const selectValue2 = document.getElementById("character-value2").value;

    const data = await getData(selectValue);
    selectedCharacter = new Character(data);
    console.log(selectedCharacter);

    const data2 = await getData(selectValue2);
    selectedCharacter2 = new Character(data2);
    console.log(selectedCharacter2);

    let pictureContainer = document.getElementById("character-img");
    let pictureContainer2 = document.getElementById("character-img2");

    let picture = new Image();
    picture.src = selectedCharacter.pictureUrl;
    pictureContainer.appendChild(picture);

    let picture2 = new Image();
    picture2.src = selectedCharacter2.pictureUrl;
    pictureContainer2.appendChild(picture2);

    let compareBtn = document.getElementById("compare-data-btn");
    compareBtn.classList.remove("hidden");

    function showInfo() {
      let characterData = document.querySelector("#show-data");
      characterData.textContent = selectedCharacter.info();

      let characterData2 = document.querySelector("#show-data2");
      characterData2.textContent = selectedCharacter2.info();
    }

    function comparison(character1, character2) {
      let comparisonData = document.getElementById("compare-character");

      const textComparison = [];
      // Längden
      if (character1.height > character2.height) {
        textComparison.push(
          `${character1.name}` + " is taller than " + `${character2.name}`
        );
      } else if (character1.height < character2.height) {
        textComparison.push(
          `${character2.name}` + " is taller than " + `${character1.name}`
        );
      } else {
        textComparison.push(
          `${character1.name}` +
            " has the same height as " +
            `${character2.name}`
        );
      }
      // Vikten
      if (character1.mass > character2.mass) {
        textComparison.push(
          `${character1.name}` + " weighs more than " + `${character2.name}`
        );
      } else if (character1.mass < character2.mass) {
        textComparison.push(
          `${character2.name}` + " weighs more than " + `${character1.name}`
        );
      } else {
        textComparison.push(
          `${character1.name}` + " weigh the same " + `${character2.name}`
        );
      }
      // Filmer
      if (character1.films > character2.films) {
        textComparison.push(
          `${character1.name}` +
            " has appeared in more movies than " +
            `${character2.name}`
        );
      } else if (character1.films < character2.films) {
        textComparison.push(
          `${character2.name}` +
            " has appeared in more movies than " +
            `${character1.name}`
        );
      } else {
        textComparison.push(
          `${character1.name}` +
            " has appeared in equal number of movies " +
            `${character2.name}`
        );
      }

      // Kön
      if (character1.gender === character2.gender) {
        textComparison.push(
          `${character1.name}` +
            " and " +
            `${character2.name}` +
            `" has the same gender"`
        );
      } else {
        textComparison.push(
          `${character2.name}` +
            " and " +
            `${character1.name}` +
            `"does not have the same gender"`
        );
      }

      // Hårfärg
      if (character1.hair_color === character2.hair_color) {
        textComparison.push(
          `${character2.name}` +
            " and " +
            `${character1.name}` +
            `"has the same haircolor"`
        );
      } else {
        textComparison.push(
          `${character1.name}` +
            " does not have the same haircolor as " +
            `${character2.name}`
        );
      }
      // Hudfärg
      if (character1.skin_color === character2.skin_color) {
        textComparison.push(
          `${character2.name}` +
            " and " +
            `${character1.name}` +
            `"has the same skincolor"`
        );
      } else {
        textComparison.push(
          `${character1.name}` +
            " does not have the same skincolor as " +
            `${character2.name}`
        );
      }

      comparisonData.textContent = textComparison.join(", ");
    }

    compareBtn.addEventListener("click", function (e) {
      e.preventDefault();

      showInfo();
      comparison(selectedCharacter, selectedCharacter2);

      let showExtraInfoBtn = document.getElementById("show-extra");
      showExtraInfoBtn.classList.remove("hidden");
    });
  });

function showExtraInfo() {
  document
    .getElementById("show-extra")
    .addEventListener("click", async function (e) {
      e.preventDefault();

      let extraData = document.querySelector("#show-extra-info"); // skriver ut datan vi vill visa
      extraData.textContent = filmResult.info();

      showExtraInfo();
    });
}
