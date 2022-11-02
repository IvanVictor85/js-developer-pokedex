
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = ("000" + pokeDetail.id).slice(-3) //mudança para ID e tratamento para inclusão dos zeros a esquerda
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types
        .map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    
    pokemon.abilities = pokeDetail.abilities
        .map((abilities => abilities.ability.name));

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()) // Fazer uma nova busca de cada detalhe individual dos pokemons via url e transformar num Json
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) //Fazer requesição da lista de pokemons
        .then((response) => response.json()) // Converte o http response(resultado da busca) para Json
        .then((jsonBody) => jsonBody.results) // Filtrar apenas os resultados que importam (lista de pokemons)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia a lista de pokemons e consverte em uma lista de detalhes dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) // Esperar que as requisições terminem e seja convertida em uma lista de Json de detalhes
        .then((pokemonsDetails) => pokemonsDetails) //Lista de detalhes dos pokemons
        //.catch((error) => console.error(error)) 
}

pokeApi.getPokemonByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((e) => alert('Pokemon Not Found!'));
}