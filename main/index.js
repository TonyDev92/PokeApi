//Datos recuperados del DOM
const button$$ = document.querySelector('button');
const search$$ = document.querySelector('.search');
const list$$ = document.querySelector('#Pokedex');
const main$$ = document.querySelector('main');
const nav$$ = document.querySelector('nav');





const url = ('https://pokeapi.co/api/v2/pokemon/');

const getDates = async() => {
    for(let i = 1; i <= 151; i++){ 
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`) //Pasamos el valor de la iteración a la url como end-Point
            const responseJson = await response.json();                            
            setPokemon(responseJson) //Al pasar la respuesta como parametro de la funcion le estamos dando los datos a la función
        } catch(error){
            console.log(error);
        }     
    }
        
}
getDates();


//Declaramos una funcion que nos muestre los pokemon por pantalla
const setPokemon = (pokemon) => {
        console.log(pokemon);
        let pokemonDiv$$ = document.createElement('div') //parte delantera de las cartas
        pokemonDiv$$.className = 'pokeCard'
        main$$.appendChild(pokemonDiv$$);
        let pokemonCardFlip$$ = document.createElement('div') //Parte trasera de las cartas
        pokemonCardFlip$$.className = 'backCard'
        main$$.appendChild(pokemonCardFlip$$);
        let pokemonFlip$$ = document.createElement('div')
        pokemonFlip$$.className = 'flipBox' //esta dentro de box y tiene pokeCard y BackCard
        pokemonFlip$$.appendChild(pokemonDiv$$)
        pokemonFlip$$.appendChild(pokemonCardFlip$$)
        let flip$$ = document.createElement('div')
        flip$$.className = 'Box' //contiene todos los elementos 
        flip$$.appendChild(pokemonFlip$$)
        main$$.appendChild(flip$$)

        let pokemonTittle$$ = document.createElement('h2')
        pokemonTittle$$.textContent = pokemon.name
        pokemonDiv$$.appendChild(pokemonTittle$$)

        let pokeImage$$ = document.createElement('img')

        pokeImage$$.setAttribute('src' , pokemon.sprites.other.dream_world.front_default)
        pokeImage$$.setAttribute('alt', pokemon.name)
        pokemonDiv$$.appendChild(pokeImage$$)

        let pokeId$$ = document.createElement('h3')
        pokeId$$.textContent = pokemon.id 
        pokemonDiv$$.appendChild(pokeId$$)

        let baseExperience$$ = document.createElement('p')
        baseExperience$$.textContent = (`Base Experience:  ${pokemon.base_experience}`)
        pokemonDiv$$.appendChild(baseExperience$$)
        
        for(const obj of pokemon.moves){ // Con un bucle entraremos un nivel más de profundidad dentro de la info 
            let move$$ = document.createElement('p')
            move$$.textContent = (`Move: ${obj.move.name}`)
            pokemonCardFlip$$.appendChild(move$$)
            break;
        }
        const getLocation = async() => { //Con esta segunda llamada a la Api conseguimos acceder al area de localizacion 
            const loc = await fetch('https://pokeapi.co/api/v2/pokemon/1/encounters')
            const locJson = await loc.json()
            console.log(locJson);
            for(const obj of locJson){
                let locationArea$$ = document.createElement('div')
                locationArea$$.textContent = (`Location Area : ${obj.location_area.name}`)
                pokemonCardFlip$$.appendChild(locationArea$$)
            }
        }    
        getLocation();
        list$$.appendChild(pokemonDiv$$);
}


