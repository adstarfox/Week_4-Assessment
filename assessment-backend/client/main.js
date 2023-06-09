const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById(`fortuneBtn`)
const genBtns = document.getElementsByClassName(`genBtn`)
const deleteBtn = document.getElementById(`deleteBtn`)
const selectors = document.querySelector(`select`)
const poke1Selector = document.getElementById(`poke1-select`)
const poke2Selector = document.getElementById(`poke2-select`)
const pokeContainer1 = document.querySelector(`#poke-container1`)
const pokeContainer2 = document.querySelector(`#poke-container2`)

const baseURL = `http://localhost:4000/api`

const getCompliment = () => {
    axios.get(`${baseURL}` + `/compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get(`${baseURL}` + `/fortune/`)
        .then(res => {
            alert(res.data)
        })
        .catch(err => console.log(err))

}

const getPokeData = data => {
    data.forEach((obj, index) => {
        let option = document.createElement(`option`)
        let option2 = document.createElement(`option`)
        let {name} = obj
        option.value = name
        option2.value = name
        option.textContent = `#${index +1} ` + name
        option2.textContent = `#${index +1} ` + name
        poke1Selector.appendChild(option) 
        poke2Selector.appendChild(option2)
    })
}

const getGen = evt => {
    if (evt.target.id === `genOne`){
        console.log(`Gen One Selected`)
        axios.get(`https://pokeapi.co/api/v2/generation/1/`)
            .then(res => {
                // console.log(res.data)
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
                        let pokeData = response.data[0]
                        getPokeData(pokeData) 
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    } else if (evt.target.id === `genTwo`){
        console.log(`Gen two selected`)
        axios.get(`https://pokeapi.co/api/v2/generation/2/`)
            .then(res => {
                // console.log(res.data.pokemon_species)
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
                        let pokeData = response.data[0]
                        // console.log(pokeData)
                        getPokeData(pokeData)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    } else if (evt.target.id === `genThree`){
        console.log(`Gen Three Selected`)
        axios.get(`https://pokeapi.co/api/v2/generation/3/`)
            .then(res => {
                // console.log(res.data.pokemon_species)
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
                        let pokeData = response.data[0]
                        // console.log(pokeData)
                        getPokeData(pokeData)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}

const deletePoke = evt => {
    pokeContainer1.innerHTML = ``
    pokeContainer2.innerHTML = ``
    axios.delete(`${baseURL}`+`/${evt.target.id}`)
        .then(res => {
            alert(`Pokemon have been deleted. Please select a new Generation`)
        })
        .catch(err => console.log(err))

    poke1Selector.innerHTML = ``
    poke2Selector.innerHTML = ``
}

const putPoke = evt => {
    evt.preventDefault()
    pokeContainer1.innerHTML = ``
    let pokePicture = ``
    console.log(evt.target.value)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${evt.target.value}/`)
        .then(res => {
            // console.log(res.data.sprites)
            let {front_default: front} = res.data.sprites
            // console.log(front)
        })
        .catch(err => console.log(err))



    
    const pokeCard = document.createElement(`div`)
    pokeCard.classList.add(`poke-card`)
    
    pokeCard.innerHTML = `<img alt='movie cover' src="${pokePicture}" class="movie-cover"/>
    <p class="movie-title">Who's that Pokemon</p>
    <div class="btns-container">
    <button onclick="console.log('attacked'), 'attack')">attack</button>
    <p class="movie-rating">HP: 5</p>
    </div>
    `
    pokeContainer1.appendChild(pokeCard)
}
const putPoke2 = evt => {
    evt.preventDefault()
    pokeContainer2.innerHTML = ``
    console.log(evt.target.value)
    const pokeCard = document.createElement(`div`)
    pokeCard.classList.add(`poke-card`)

    pokeCard.innerHTML = `<img alt='movie cover' src="https://api.triviacreator.com/v1/imgs/quiz/whos_that_pokemon-a5373887-8dd0-449f-8475-d7bc129d767d.webp" class="movie-cover"/>
    <p class="movie-title">Who's that Pokemon</p>
    <div class="btns-container">
        <button onclick="console.log('attacked'), 'attack')">attack</button>
        <p class="movie-rating">HP: 5</p>
    </div>
    `
    pokeContainer2.appendChild(pokeCard)
}


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener(`click`, getFortune)
deleteBtn.addEventListener(`click`, deletePoke)
poke1Selector.addEventListener(`change`, putPoke)
poke2Selector.addEventListener(`change`, putPoke2)

for(let i = 0; i < genBtns.length; i++){
    genBtns[i].addEventListener(`click`, getGen)
}
