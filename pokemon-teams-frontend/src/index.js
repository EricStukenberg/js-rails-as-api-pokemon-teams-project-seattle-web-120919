const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', (event) => {
    fetchTrainers();


});


function fetchTrainers() {
    fetch(TRAINERS_URL).then((res) => {
        return res.json();
    })
    .then((json) => {
        console.log(json)
        makeTrainerCards(json)
    }).catch((error) => {
        console.error('ERROR:', error);
    });

}


function makeTrainerCards(trainers) {
    trainers.forEach(trainer => {
        makeTrainerCard(trainer);
        
    });

}

function makeTrainerCard(trainer) {
    const main = document.querySelector("main");

    const card_div = document.createElement('div');
    card_div.className = "card";
    card_div.setAttribute('data-id', trainer.id);

    const p = document.createElement('p');
    p.textContent = trainer.name 

    const pokemonUl = document.createElement("ul")

    const btn = document.createElement('button')
    btn.setAttribute('data-trainer-id', trainer.id)
    btn.textContent = "Add Pokemon"
    btn.addEventListener("click", () => addPokemon(trainer, pokemonUl))

    trainer.pokemons.forEach(pokemon => {
        const pokemonLi = document.createElement("li")
        const releaseBtn = document.createElement("button")
        releaseBtn.innerText = "Release"
        releaseBtn.className = "release"
        releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
        releaseBtn.addEventListener("click", () => releasePokemon(pokemon, pokemonLi))
        pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species}) `
        pokemonLi.appendChild(releaseBtn)
        pokemonUl.appendChild(pokemonLi)
    });

    card_div.appendChild(p)
    card_div.appendChild(btn)
    card_div.appendChild(pokemonUl)

    main.appendChild(card_div)
}

function addPokemon(trainer, pokemonUl) {
    console.log(trainer.id)
    fetch(POKEMONS_URL, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },

    body: 
       JSON.stringify({trainer_id: trainer.id})
    

    }).then(res => {
        console.log(res)
        return res.json()
    }).then((pokemon) => {
        console.log(pokemon)
        const pokemonLi = document.createElement("li")
        const releaseBtn = document.createElement("button")
        releaseBtn.innerText = "Release"
        releaseBtn.className = "release"
        releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
        releaseBtn.addEventListener("click", () => releasePokemon(pokemon, pokemonLi))
        pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species}) `
        pokemonLi.appendChild(releaseBtn)
        pokemonUl.appendChild(pokemonLi)
      
    }).catch((error) => {
    });
}

function releasePokemon(pokemon, pokemonLi) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: 'DELETE'
    }).then(res => {
        if (res.status == 204) {
            console.log("Pokemon Released")
            pokemonLi.remove();
        }
    })
}

function addPokemonToCard(trainer, pokemon) {
    trainer.pokemons.push(pokemon)

    // get traiers pokemon list elements 
    // 
}