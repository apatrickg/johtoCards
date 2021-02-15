const pokeGrid = document.querySelector('.poke-grid');
const pokeContainer = document.querySelector('.container');
const loader = document.getElementById('loader');
const contentTop = document.querySelector('.content-top');
const header = document.querySelector('.header');

const promises = [];

function showContent(){
  loader.classList.add('hidden');
  header.classList.remove('hidden');
  contentTop.classList.remove('hidden');
  pokeContainer.classList.remove('hidden');
}

function displayPokemon(pkmnData){
  pkmnData.forEach((pokemon) => {
    // Card
    const card = document.createElement('div');
    card.classList.add('card');
    const move = document.createElement('div');
    // Pokemon moves
    move.classList.add('move');
    const pokeMoves = document.createElement('p');
    pokeMoves.classList.add('poke-moves');
    pokeMoves.textContent = `Moves: ${pokemon.moves}`;
    const ability = document.createElement('div');
    // Pokemon abilities
    ability.classList.add('ability');
    const pokeAbilities = document.createElement('p');
    pokeAbilities.textContent = `Abilities: ${pokemon.ability}`;
    // Pokemon measurements
    const pokeMeasurements = document.createElement('div');
    pokeMeasurements.classList.add('measurements');
    const pokeHeight = document.createElement('span');
    pokeHeight.textContent = `Height: ${pokemon.height}`;
    const pokeWeight = document.createElement('span');
    pokeWeight.classList.add('weight');
    pokeWeight.textContent = `Weight: ${pokemon.weight}`;
    const cardBody = document.createElement('div');
    // Card body 
    cardBody.classList.add('card-body');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const pokeImage = document.createElement('img');
    pokeImage.classList.add('card-image');
    pokeImage.src = pokemon.image;
    // Card Top
    const cardTop = document.createElement('div');
    cardTop.classList.add('card-top');
    const pokeNumber = document.createElement('span');
    pokeNumber.classList.add('number');
    pokeNumber.textContent = `# ${pokemon.id}`;
    const pokeName = document.createElement('span');
    pokeName.classList.add('name');
    pokeName.textContent = pokemon.name;
    const pokeType = document.createElement('span');
    pokeType.classList.add('type');
    pokeType.textContent = pokemon.type;

    move.appendChild(pokeMoves);
    ability.appendChild(pokeAbilities);
    pokeMeasurements.append(pokeHeight,pokeWeight);
    cardBody.append(pokeMeasurements, ability, move);
    imageContainer.appendChild(pokeImage);
    cardTop.append(pokeNumber, pokeName, pokeType);
    card.append(cardTop, imageContainer, cardBody);
    pokeGrid.appendChild(card);

    showContent();
  })
}

// get Johto Pokemon Data
function fetchJohtoPokemon(){
  // Show loader
  loader.classList.remove('hidden');
  // Push fetched url data into promise array
  for (let i = 152; i < 252; i++){
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(apiURL).then(response => response.json()));
  }
  // Map through promise array to get data needed
  Promise.all(promises).then((results) => {
    const pkmnData = results.map((result) => ({
      name : result.name.charAt(0).toUpperCase() + result.name.slice(1),
      ability: result.abilities.map((ability) => ability.ability.name).join(' / '),
      moves: result.moves.slice(0,4).map((move) => move.move.name).join(', '),
      image : result.sprites.other['official-artwork'].front_default,
      type: result.types.map((type) => type.type.name).join(' / '),
      id: result.id,
      height: result.height,
      weight: result.weight
    })).sort((a,b) => a-b);
    displayPokemon(pkmnData);
  });
}

fetchJohtoPokemon();