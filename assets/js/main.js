const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1000
const limit = 10
let offset = 0;

function loadPokemonItens(offset, limit) {   
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>  
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            <div class="detail-btn">
                                <button type='button' 
                                    onclick='showDetails("${pokemon.name}")'>
                                    Details
                                </button>
                            </div>
                        </ol>
        
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                    
                </li>  
            `).join('') 
        pokemonList.innerHTML += newHtml
    }) 
} 

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit )

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const modalToggle = () => {
    document.getElementById('modal-overlay').classList.toggle('active');
}

// show details of a specific pokemon

function showDetails(name) {
    pokeApi.getPokemonByName(name)
        .then((details) => {
            const modal = document.getElementById('modal');

            modal.removeAttribute('class');
            modal.classList.add(details.type);

            document.getElementById('modal-overlay').classList.add('active');
            document.querySelector('#modal h2').innerHTML = details.name;            
            document.querySelector('#modal #number').innerHTML = `#${details.number}`;

            document.querySelector('#modal .details #abilities').innerHTML = `
                Abilities: ${details.abilities.map((ability) => `${ability}`).join(', ')}
            `;

            document.querySelector('#modal img').src = details.photo;
            document.querySelector('#modal .details #species').innerHTML = `Species: ${details.species}`;
            document.querySelector('#modal .details #height').innerHTML = `Height: ${details.height}`;
            document.querySelector('#modal .details #weight').innerHTML = `Weight: ${details.weight}`;
        });
}


/*     const listItens = []

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItens.push(convertPokemonToLi(pokemon))
    }
    console.log(listItens) */
                  
   
    //.catch((error) => console.log(error))

    /*
    .then(function (response) {

        response
            .json()
            .then(function (responseBody){
                console.log(responseBody)
            })
    })
    .catch(function (error) {
        console.error(error)     
    })
    .finally(function() {
        console.log('Requisição concluída')
    })*/
