import {
    injectChooseShape,
    injectChooseSpecies,
    injectChooseVariety,
    injectPokemon,
    injectProgressBar
} from "./inject.js"
import { fetchShapes } from "./service.js"
import state, { KEYS } from "./state.js"

const initListeners = () => {
    window.addEventListener('resize', () => injectProgressBar(state.progressBar))

    document.addEventListener(KEYS.selectedPokemon, () => {
        injectProgressBar(100)
        injectPokemon()
    })

    document.addEventListener(KEYS.selectedSpecies, async () => {
        injectChooseVariety()
        injectProgressBar(66)
    })

    document.addEventListener(KEYS.selectedShape, () => {
        injectChooseSpecies()
        injectProgressBar(33)
    })
}

const main = async () => {
    initListeners()
    await fetchShapes()
    injectChooseShape()
    injectProgressBar(0)
}
main()