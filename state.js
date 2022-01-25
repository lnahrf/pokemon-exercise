export const KEYS = {
    selectedShape: "selectedShape",
    selectedSpecies: "selectedSpecies",
    selectedVarieties: "selectedVarieties",
    selectedPokemon: "selectedPokemon",
    progressBar: "progressBar",
    shapes: "shapes",
    species: "species",
}

const events = {}

const state = new Proxy({
    selectedShape: '',
    selectedSpecies: '',
    selectedVarieties: [],
    selectedPokemon: {},
    progressBar: 0,
    shapes: [],
    species: {}
}, {
    set: function (state, key, value) {
        state[key] = value
        document.dispatchEvent(events[key])
        return state
    }
});

const initEvents = () => {
    for (const key of Object.values(KEYS)) {
        events[key] = document.createEvent('MutationEvents')
        events[key].initEvent(key, true, true)
    }
}
initEvents()

export default state