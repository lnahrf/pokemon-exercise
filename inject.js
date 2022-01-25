import { fetchPokemon, fetchVarieties } from "./service.js"
import state from "./state.js"
import { capitalize } from "./utils.js"

export const injectProgressBar = (percent) => {
    if (document.getElementById("progressBar")) document.body.removeChild(document.getElementById("progressBar"))
    const progressBar = document.createElement('div')
    progressBar.id = "progressBar"
    progressBar.style.backgroundColor = '#a4eb34'
    progressBar.style.width = `${window.innerWidth * percent / 100}px`
    progressBar.style.height = '10px'
    state.progressBar = percent
    document.body.prepend(progressBar)
}

export const injectChooseShape = () => {
    if (document.getElementById("pokemon")) document.getElementById("container").removeChild(document.getElementById("pokemon"))
    if (document.getElementById("chooseVariety")) document.getElementById("container").removeChild(document.getElementById("chooseVariety"))
    if (document.getElementById("chooseSpecies")) document.getElementById("container").removeChild(document.getElementById("chooseSpecies"))
    if (document.getElementById("chooseShape")) document.getElementById("container").removeChild(document.getElementById("chooseShape"))

    const container = document.createElement('div')
    container.id = "chooseShape"
    container.className = "d-flex flex-column w-25"
    const title = document.createElement("p")
    title.className = "fs-4 p-2"
    title.innerText = "Select Shape"
    container.appendChild(title)
    for (const shape of state.shapes) {
        const el = document.createElement('div')
        el.onclick = () => state.selectedShape = shape.name
        el.id = shape.name
        el.className = "d-flex align-items-start border rounded pt-3 ps-3 mb-3 ms-1"
        el.innerHTML = `<p>${capitalize(shape.name)}</p>`
        container.appendChild(el)
    }
    document.getElementById("container").appendChild(container)
}

export const injectChooseSpecies = () => {
    if (document.getElementById("pokemon")) document.getElementById("container").removeChild(document.getElementById("pokemon"))
    if (document.getElementById("chooseVariety")) document.getElementById("container").removeChild(document.getElementById("chooseVariety"))
    if (document.getElementById("chooseSpecies")) document.getElementById("container").removeChild(document.getElementById("chooseSpecies"))
    const container = document.createElement('div')
    container.id = "chooseSpecies"
    container.className = "d-flex flex-column w-25"
    const title = document.createElement("p")
    title.className = "fs-4 p-2"
    title.innerText = "Select Species"
    container.appendChild(title)
    for (const species of state.species[state.selectedShape]) {
        const el = document.createElement('div')
        el.onclick = async () => {
            state.selectedVarieties = await fetchVarieties(species.url)
            state.selectedSpecies = species
        }
        el.className = "d-flex align-items-start border rounded pt-3 ps-3 mb-3 ms-1"
        el.innerHTML = `<p>${capitalize(species.name)}</p>`
        container.appendChild(el)
    }
    document.getElementById("container").appendChild(container)
}

export const injectChooseVariety = () => {
    if (document.getElementById("pokemon")) document.getElementById("container").removeChild(document.getElementById("pokemon"))
    if (document.getElementById("chooseVariety")) document.getElementById("container").removeChild(document.getElementById("chooseVariety"))
    const container = document.createElement('div')
    container.id = "chooseVariety"
    container.className = "d-flex flex-column w-25"
    const title = document.createElement("p")
    title.className = "fs-4 p-2"
    title.innerText = "Select Variety"
    container.appendChild(title)
    for (const variety of state.selectedVarieties) {
        const el = document.createElement('div')
        el.onclick = async () => {
            state.selectedPokemon = await fetchPokemon(variety.pokemon.url)
        }
        el.className = "d-flex align-items-start border rounded pt-3 ps-3 mb-3 ms-1"
        el.innerHTML = `<p>${capitalize(variety.pokemon.name)}</p>`
        container.appendChild(el)
    }
    document.getElementById("container").appendChild(container)

}

export const injectPokemon = () => {
    console.log(state.selectedPokemon)
    if (document.getElementById("pokemon")) document.getElementById("container").removeChild(document.getElementById("pokemon"))
    const container = document.createElement('div')
    container.id = "pokemon"
    container.className = "d-flex flex-column w-25"


    let html = `
    <p class="fs-4 p-2">Pokemon</p>
    <div class="border ms-1 p-3 br-3 rounded">
    <div class="d-flex flex-row justify-content-center align-items-center">
    <p class="fs-4">${capitalize(state.selectedPokemon.name)}</p>
    <img class="w-50" src="${state.selectedPokemon.sprites.front_default}" />
    </div>
    <p><strong>Types</strong>
    <span>${state.selectedPokemon.types.map((t, idx) => `
    ${capitalize(t.type.name)}
    ${idx !== state.selectedPokemon.types.length - 1 ? "\\" : ""}`)}</span>
    </p>
    ${state.selectedPokemon.stats.map(s => `<p><strong>${capitalize(s.stat.name)}</strong> ${s.base_stat}</p>`)}
    </div>`
    html = html.replace(/,/g, "")
    container.innerHTML = html

    const buttonContainer = document.createElement("div")
    buttonContainer.className = "d-flex flex-row"

    const closeButton = document.createElement("button")
    closeButton.innerText = "Close"
    closeButton.className = "btn-secondary w-50 m-2 rounded"
    closeButton.onclick = () => {
        if (document.getElementById("pokemon")) document.getElementById("container").removeChild(document.getElementById("pokemon"))
    }
    buttonContainer.appendChild(closeButton)

    const resetButton = document.createElement("button")
    resetButton.innerText = "Reset"
    resetButton.className = "btn-primary w-50 m-2 rounded"
    resetButton.onclick = () => {
        injectChooseShape()
        injectProgressBar(0)
    }
    buttonContainer.appendChild(resetButton)
    container.appendChild(buttonContainer)
    document.getElementById("container").appendChild(container)

}