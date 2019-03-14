const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.querySelector('main');

document.addEventListener("DOMContentLoaded", function(){
    renderTrainers()

})

function renderTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(function(trainer){
            const card = document.createElement('div');
            card.setAttribute('class', 'card')
            card.dataset.id = trainer.id
            
            MAIN.appendChild(card)

            const name = document.createElement('p');
            name.innerText = trainer.name;
            card.appendChild(name);
            
            const button = document.createElement('button');
            button.innerText = "Add Pokemon"
            button.dataset.trainerId = trainer.id;
            button.addEventListener('click', handleAddPokemon)
            card.appendChild(button);
            
            const pokemonList = document.createElement('ul')
            card.appendChild(pokemonList);

            trainer.pokemons.forEach (pokemon => addPokemon(pokemon, pokemonList));
        })
    })
}

function handleReleasePokemon(e) {
    e.target.parentNode.remove();
    releasePokemon(e.target.dataset.pokemonId)
}

function releasePokemon(id) {
    fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(res => console.log(res))
}

function handleAddPokemon(e) {
 fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            trainer_id: e.target.dataset.trainerId
        })
    })
    .then(resp => resp.json())
    .then(json => {
        const card = MAIN.querySelector(`.card[data-id="${json.trainer_id}"]`)
        const pokemonList = card.querySelector('ul')
        addPokemon(json, pokemonList);
    })
}

function addPokemon(pokemon, list) {
    const listItem = document.createElement('li');
    listItem.innerText = `${pokemon.nickname} (${pokemon.species})`;
    const releaseButton = document.createElement('button');
    releaseButton.setAttribute('class', 'release')
    releaseButton.innerText = "Release"
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.addEventListener('click', handleReleasePokemon)
    listItem.appendChild(releaseButton)
    list.appendChild(listItem)

}

