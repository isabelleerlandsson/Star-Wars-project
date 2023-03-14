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
    this.hairColor = hair_color;
    this.skinColor = skin_color;
    this.eyeColor = eye_color;
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

    // Ta bort klass
    let compareBtn = document.getElementById("compare-data-btn");
    compareBtn.classList.remove("hidden");

    function showInfo() {
      //Klicka på knapp och få ut info.

      let characterData = document.querySelector("#show-data");
      characterData.textContent = selectedCharacter.info();

      //       let attribut = document.querySelector("#attribut");
      //       attribut.innerHTML = `<p>Name</p><p>Kön</p><p>Längd</p>
      //   <p>Vikt</p><p>Hårfärg</p><p>Hudfärg</p><p>Ögonfärg</p>`;

      let characterData2 = document.querySelector("#show-data2");
      characterData2.textContent = selectedCharacter2.info();
    }
    // Jämför data mellan karaktärer

    function comparison(character1, character2) {
      let comparisonData = document.getElementById("compare-character");

      const textComparison = [];
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
      comparisonData.textContent = textComparison.join(", ");
    }

    compareBtn.addEventListener("click", function (e) {
      e.preventDefault();

      showInfo();
      comparison(selectedCharacter, selectedCharacter2);
    });
  });
